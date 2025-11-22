import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class UpdateProfileService {
  constructor(private readonly prisma: PrismaService) {}

  private async hashPassword(password?: string) {
    return password ? await bcrypt.hash(password, 10) : undefined;
  }

  async execute(userId: string, data: { email?: string; password?: string }) {
    const updateData: any = {};
    if (data.email) updateData.email = data.email;
    if (data.password) updateData.password = await this.hashPassword(data.password);

    try {
      const updated = await this.prisma.user.update({
        where: { id: userId },
        data: updateData,
        include: { roles: { include: { role: { include: { permissions: { include: { permission: true } } } } } } },
      });
      return { success: true, message: 'Profile updated successfully', user: updated };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002')
        throw new BadRequestException({ success: false, message: `Email "${data.email}" already in use` });
      throw error;
    }
  }
}
