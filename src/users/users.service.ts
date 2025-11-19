import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  // Crear usuario con rol
  async createUser(email: string, password: string, roleId: string) {
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const user = await this.prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          roles: { create: { roleId } },
        },
        include: { roles: { include: { role: true } } },
      });

      return user;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new BadRequestException(`The email "${email}" is already registered`);
      }
      throw error;
    }
  }

  // Obtener todos los usuarios activos con roles
  async findAll() {
    return await this.prisma.user.findMany({
      where: { isActive: true },
      include: { roles: { include: { role: true } } },
    });
  }

  // Obtener usuario por ID
  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { roles: { include: { role: true } } },
    });
    if (!user) throw new NotFoundException(`User with ID "${id}" not found`);
    return user;
  }

  // Actualizar usuario por ID
  async update(id: string, data: { email?: string; password?: string; roleId?: string }) {
    const updateData: any = {};
    if (data.email) updateData.email = data.email;
    if (data.password) updateData.password = await bcrypt.hash(data.password, 10);

    try {
      const updatedUser = await this.prisma.user.update({
        where: { id },
        data: updateData,
        include: { roles: { include: { role: true } } },
      });

      if (data.roleId) {
        await this.prisma.userRole.deleteMany({ where: { userId: id } });
        await this.prisma.userRole.create({ data: { userId: id, roleId: data.roleId } });
      }

      return updatedUser;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new BadRequestException(`The email "${data.email}" is already in use`);
      }
      throw error;
    }
  }

  // Desactivar usuario
  async deactivate(id: string) {
    return await this.prisma.user.update({
      where: { id },
      data: { isActive: false },
      include: { roles: { include: { role: true } } },
    });
  }

  // Eliminar usuario
  async delete(id: string) {
    return await this.prisma.user.delete({ where: { id } });
  }

  // Obtener perfil del usuario autenticado
  async getProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { roles: { include: { role: true } } },
    });
    if (!user) throw new NotFoundException(`Profile not found for user ID "${userId}"`);
    return user;
  }

  // Actualizar perfil propio
  async updateProfile(userId: string, data: { email?: string; password?: string }) {
    const updateData: any = {};
    if (data.email) updateData.email = data.email;
    if (data.password) updateData.password = await bcrypt.hash(data.password, 10);

    try {
      const updatedUser = await this.prisma.user.update({
        where: { id: userId },
        data: updateData,
        include: { roles: { include: { role: true } } },
      });

      return updatedUser;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new BadRequestException(`The email "${data.email}" is already in use`);
      }
      throw error;
    }
  }
}
