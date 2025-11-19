import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PermissionsService {
  constructor(private prisma: PrismaService) {}

  async create(name: string, description?: string) {
    return this.prisma.permission.create({
      data: { name, description },
    });
  }

  async findAll() {
    return this.prisma.permission.findMany();
  }

  async assignPermissionToRole(roleId: string, permissionId: string) {
    return this.prisma.rolePermission.create({
      data: { roleId, permissionId },
    });
  }

  async removePermissionFromRole(roleId: string, permissionId: string) {
    return this.prisma.rolePermission.deleteMany({
      where: { roleId, permissionId },
    });
  }
}
