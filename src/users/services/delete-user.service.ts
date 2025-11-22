import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class DeleteUserService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(id: string) {
    try {
      const user = await this.prisma.user.delete({ where: { id } });
      return { success: true, message: 'User deleted successfully', user };
    } catch {
      throw new NotFoundException({ success: false, message: `User with ID "${id}" not found` });
    }
  }
}
