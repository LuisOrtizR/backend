import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { RolesService } from '../../roles/roles.service';

@Injectable()
export class UpdateUserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly rolesService: RolesService
  ) {}

  private async hashPassword(password?: string) {
    return password ? await bcrypt.hash(password, 10) : undefined;
  }

  async execute(
    id: string,
    data: { email?: string; password?: string; roleId?: string }
  ) {
    const updateData: any = {};
    if (data.email) updateData.email = data.email;
    if (data.password) updateData.password = await this.hashPassword(data.password);

    try {
      const updatedUser = await this.prisma.user.update({
        where: { id },
        data: updateData,
        include: {
          roles: {
            include: {
              role: {
                include: { permissions: { include: { permission: true } } },
              },
            },
          },
        },
      });

      if (data.roleId) {
        await this.rolesService.assignRoleToUser(id, data.roleId);
      }

      return {
        success: true,
        message: 'User updated successfully',
        user: await this.prisma.user.findUnique({
          where: { id },
          include: {
            roles: {
              include: {
                role: {
                  include: { permissions: { include: { permission: true } } },
                },
              },
            },
          },
        }),
      };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new BadRequestException({
          success: false,
          message: `Email "${data.email}" already in use`,
        });
      }
      if (error.code === 'P2025') {
        throw new NotFoundException({
          success: false,
          message: `User with ID "${id}" not found`,
        });
      }

      throw error;
    }
  }
}
