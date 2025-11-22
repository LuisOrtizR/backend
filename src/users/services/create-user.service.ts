import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { RolesService } from '../../roles/roles.service';

@Injectable()
export class CreateUserService {
  constructor(private readonly prisma: PrismaService, private readonly rolesService: RolesService) {}

  private async hashPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }

  async execute(email: string, password: string, roleId: string) {
    const hashedPassword = await this.hashPassword(password);

    try {
      const user = await this.prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          roles: { create: { roleId } },
        },
        include: {
          roles: { include: { role: { include: { permissions: { include: { permission: true } } } } } },
        },
      });

      return { success: true, message: 'User created successfully', user };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new BadRequestException({ success: false, message: `Email "${email}" is already registered` });
      }
      throw error;
    }
  }
}
