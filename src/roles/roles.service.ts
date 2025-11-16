import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RolesService {
  constructor(private prisma: PrismaService) {}

  create(name: string, description?: string) {
    return this.prisma.role.create({
      data: { name, description },
    });
  }

  findAll() {
    return this.prisma.role.findMany();
  }

  async findByName(name: string) {
    const role = await this.prisma.role.findUnique({
      where: { name },
    });
    if (!role) throw new NotFoundException(`Role ${name} not found`);
    return role;
  }

  async assignRoleToUser(userId: string, roleId: string) {
    return this.prisma.userRole.create({
      data: {
        userId,
        roleId,
      },
    });
  }
}
