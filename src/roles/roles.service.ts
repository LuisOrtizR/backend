import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RolesService {
  constructor(private prisma: PrismaService) {}

  // Crear rol
  async create(name: string, description?: string) {
    return this.prisma.role.create({
      data: { name, description },
    });
  }

  // Listar roles con permisos
  async findAll() {
    return this.prisma.role.findMany({
      include: {
        permissions: {
          include: {
            permission: true
          }
        }
      }
    });
  }

  // Buscar por nombre
  async findByName(name: string) {
    const role = await this.prisma.role.findUnique({
      where: { name },
      include: {
        permissions: {
          include: { permission: true }
        }
      }
    });

    if (!role) throw new NotFoundException(`Role "${name}" not found`);
    return role;
  }

  // Buscar rol por id
  async findById(id: string) {
    const role = await this.prisma.role.findUnique({
      where: { id },
      include: {
        permissions: {
          include: { permission: true }
        }
      }
    });

    if (!role) throw new NotFoundException(`Role with id "${id}" not found`);
    return role;
  }

  // Actualizar
  async update(id: string, data: { name?: string; description?: string }) {
    await this.findById(id);
    return this.prisma.role.update({
      where: { id },
      data,
    });
  }

  // Eliminar
  async remove(id: string) {
    await this.findById(id);
    return this.prisma.role.delete({ where: { id } });
  }

  // Asignar rol a usuario
  async assignRoleToUser(userId: string, roleId: string) {
    return this.prisma.userRole.create({
      data: { userId, roleId },
    });
  }

  // Remover rol a usuario
  async removeRoleFromUser(userId: string, roleId: string) {
    return this.prisma.userRole.deleteMany({
      where: { userId, roleId },
    });
  }
}
