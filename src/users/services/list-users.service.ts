import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ListUsersService {
  constructor(private readonly prisma: PrismaService) {}

  async execute() {
    const users = await this.prisma.user.findMany({
      where: { isActive: true },
      include: { roles: { include: { role: { include: { permissions: { include: { permission: true } } } } } } },
    });
    return { success: true, message: 'Users fetched successfully', users };
  }
}
