import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(email: string, password: string, roleId: string) {
    const hashed = await bcrypt.hash(password, 10);

    return this.prisma.user.create({
      data: {
        email,
        password: hashed,
        roles: {
          create: { roleId },
        },
      },
      include: {
        roles: { include: { role: true } },
      },
    });
  }

  async findAll() {
    return this.prisma.user.findMany({
      include: {
        roles: { include: { role: true } },
      },
    });
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        roles: { include: { role: true } },
      },
    });

    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async update(id: string, data: any) {
    const updateData: any = {};

    if (data.email) updateData.email = data.email;
    if (data.password) updateData.password = await bcrypt.hash(data.password, 10);

    const result = await this.prisma.user.update({
      where: { id },
      data: updateData,
      include: {
        roles: { include: { role: true } },
      },
    });

    // Si envía nuevo roleId → lo reasignamos
    if (data.roleId) {
      await this.prisma.userRole.deleteMany({ where: { userId: id } });

      await this.prisma.userRole.create({
        data: { userId: id, roleId: data.roleId },
      });
    }

    return this.findOne(id);
  }

  async remove(id: string) {
    return this.prisma.user.update({
      where: { id },
      data: { isActive: false },
    });
  }

  async delete(id: string) {
    return this.prisma.user.delete({
      where: { id },
    });
  }

  async getProfile(userId: string) {
    return this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        roles: { include: { role: true } },
      },
    });
  }
}
