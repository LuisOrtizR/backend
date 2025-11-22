import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { OrderFiltersDto } from './dto/order-filters.dto';
import { Prisma, OrderStatus } from '@prisma/client';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  // Crear pedido
  async create(userId: string, dto: CreateOrderDto) {
    if (dto.items.length === 0) {
      throw new BadRequestException('Order must contain items.');
    }

    const productIds = dto.items.map((i) => i.productId);

    const products = await this.prisma.product.findMany({
      where: { id: { in: productIds }, isActive: true },
    });

    if (products.length !== dto.items.length) {
      throw new BadRequestException(
        `One or more products do not exist or are inactive`,
      );
    }

    const orderItems: Prisma.OrderItemUncheckedCreateWithoutOrderInput[] = [];
    let total = 0;

    for (const item of dto.items) {
      const product = products.find((p) => p.id === item.productId);

      if (!product) {
        throw new BadRequestException(`Product not found: ${item.productId}`);
      }

      if (product.stock < item.quantity) {
        throw new BadRequestException(
          `Insufficient stock for product: ${product.name}`,
        );
      }

      const subtotal = Number(product.price) * item.quantity;
      total += subtotal;

      orderItems.push({
        productId: product.id,
        quantity: item.quantity,
        subtotal: subtotal,
      });
    }

    // Crear pedido + descontar stock
    return await this.prisma.$transaction(async (tx) => {
      const order = await tx.order.create({
        data: {
          userId,
          total,
          items: {
            create: orderItems,
          },
        },
        include: {
          items: {
            include: { product: true },
          },
        },
      });

      // Restar stock
      for (const item of dto.items) {
        await tx.product.update({
          where: { id: item.productId },
          data: { stock: { decrement: item.quantity } },
        });
      }

      return order;
    });
  }

  // Obtener todos con filtros
  async findAll(filters: OrderFiltersDto) {
    const { page = 1, limit = 10, status } = filters;

    const where: Prisma.OrderWhereInput = {};

    if (status) {
      where.status = status as OrderStatus;
    }

    const skip = (page - 1) * limit;

    const [orders, total] = await Promise.all([
      this.prisma.order.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          items: { include: { product: true } },
          user: true,
        },
      }),
      this.prisma.order.count({ where }),
    ]);

    return {
      page,
      limit,
      total,
      data: orders,
    };
  }

  // Obtener un pedido
  async findOne(id: string) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: {
        items: { include: { product: true } },
        user: true,
      },
    });

    if (!order) throw new NotFoundException('Order not found');

    return order;
  }

  // Pedidos de un usuario
  async findMyOrders(userId: string) {
    return await this.prisma.order.findMany({
      where: { userId },
      include: {
        items: { include: { product: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  // Actualizar estado
  async updateStatus(id: string, dto: UpdateOrderStatusDto) {
    await this.findOne(id);

    return await this.prisma.order.update({
      where: { id },
      data: { status: dto.status as OrderStatus },
    });
  }
}
