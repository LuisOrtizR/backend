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

  // Listar todos los roles
  async findAll() {
    return this.prisma.role.findMany();
  }

  // Buscar rol por nombre
  async findByName(name: string) {
    const role = await this.prisma.role.findUnique({ where: { name } });
    if (!role) throw new NotFoundException(`Role "${name}" not found`);
    return role;
  }

  // Buscar rol por id
  async findById(id: string) {
    const role = await this.prisma.role.findUnique({ where: { id } });
    if (!role) throw new NotFoundException(`Role with id "${id}" not found`);
    return role;
  }

  // Actualizar rol
  async update(id: string, data: { name?: string; description?: string }) {
    await this.findById(id); // Validar que existe
    return this.prisma.role.update({ where: { id }, data });
  }

  // Eliminar rol
  async remove(id: string) {
    await this.findById(id); // Validar que existe
    return this.prisma.role.delete({ where: { id } });
  }

  // Asignar rol a usuario
  async assignRoleToUser(userId: string, roleId: string) {
    return this.prisma.userRole.create({
      data: { userId, roleId },
    });
  }
}
