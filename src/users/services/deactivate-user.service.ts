import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class DeactivateUserService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(id: string) {
    try {
      const user = await this.prisma.user.update({
        where: { id },
        data: { isActive: false },
        include: { roles: { include: { role: { include: { permissions: { include: { permission: true } } } } } } },
      });
      return { success: true, message: 'User deactivated successfully', user };
    } catch {
      throw new NotFoundException({ success: false, message: `User with ID "${id}" not found` });
    }
  }
}
