import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FilterProductDto } from './dto/filter-product.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  // Crear producto
  async create(data: CreateProductDto) {
    return await this.prisma.product.create({
      data
    });
  }

  // Obtener todos con filtros avanzados
  async findAll(filters: FilterProductDto) {
    const {
      search,
      minPrice,
      maxPrice,
      page = 1,
      limit = 10
    } = filters;

    const where: any = { isActive: true };

    if (search) {
      where.OR = [
        { name: { contains: search } },
        { description: { contains: search } }
      ];
    }

    if (minPrice) where.price = { gte: minPrice };
    if (maxPrice) where.price = { ...where.price, lte: maxPrice };

    const skip = (page - 1) * limit;

    const [products, total] = await Promise.all([
      this.prisma.product.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' }
      }),
      this.prisma.product.count({ where })
    ]);

    return {
      page,
      limit,
      total,
      data: products
    };
  }

  // Buscar por ID
  async findOne(id: string) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  // Actualizar
  async update(id: string, data: UpdateProductDto) {
    await this.findOne(id);

    return this.prisma.product.update({
      where: { id },
      data
    });
  }

  // Soft delete
  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.product.update({
      where: { id },
      data: { isActive: false }
    });
  }
}
