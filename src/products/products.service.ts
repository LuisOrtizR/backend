import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FilterProductDto } from './dto/filter-product.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  // Crear producto con conversión segura de price
  async create(data: CreateProductDto) {
    const price = Number(data.price);
    if (isNaN(price) || price < 0) throw new BadRequestException('El precio debe ser un número válido mayor o igual a 0');

    return await this.prisma.product.create({
      data: { ...data, price },
    });
  }

  // Obtener productos con filtros y paginación
  async findAll(filters: FilterProductDto) {
    const { search, minPrice, maxPrice, page = 1, limit = 10 } = filters;

    const where: any = { isActive: true };

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (minPrice !== undefined) where.price = { gte: minPrice };
    if (maxPrice !== undefined) where.price = { ...where.price, lte: maxPrice };

    const skip = (page - 1) * limit;

    const [products, total] = await Promise.all([
      this.prisma.product.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.product.count({ where }),
    ]);

    return { page, limit, total, data: products };
  }

  // Buscar por ID
  async findOne(id: string) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) throw new NotFoundException('Producto no encontrado');
    return product;
  }

  // Actualizar producto con validación de price
  async update(id: string, data: UpdateProductDto) {
    await this.findOne(id);

    if (data.price !== undefined) {
      const price = Number(data.price);
      if (isNaN(price) || price < 0) throw new BadRequestException('El precio debe ser un número válido mayor o igual a 0');
      data.price = price;
    }

    return this.prisma.product.update({ where: { id }, data });
  }

  // Soft delete
  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.product.update({ where: { id }, data: { isActive: false } });
  }
}
