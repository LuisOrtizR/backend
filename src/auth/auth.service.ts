import { Injectable, BadRequestException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import { RegisterDto } from './dto/register.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { RegisterResponseDto } from './dto/register-response.dto';

@Injectable()
export class AuthService {
  private transporter;

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get('MAIL_HOST'),
      port: +this.configService.get('MAIL_PORT'),
      secure: false,
      auth: {
        user: this.configService.get('MAIL_USER'),
        pass: this.configService.get('MAIL_PASS'),
      },
    });
  }

  // -------------------------------
  // Register customer
  // -------------------------------
  async register(dto: RegisterDto): Promise<RegisterResponseDto> {
    const clientRole = await this.prisma.role.findUnique({ where: { name: 'Customer' } });
    if (!clientRole) throw new BadRequestException('Customer role not found');

    try {
      const createdUser = await this.usersService.createUser(dto.email, dto.password, clientRole.id);

      const roleNames = createdUser.roles?.map(r => r.role.name) || [];

      const safeUser = {
        id: createdUser.id,
        name: createdUser.name,
        email: createdUser.email,
        avatar: createdUser.avatar,
        isActive: createdUser.isActive,
        createdAt: createdUser.createdAt,
        updatedAt: createdUser.updatedAt,
        roles: roleNames,
      };

      return {
        message: 'User created successfully',
        user: safeUser,
      };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new BadRequestException('Email already registered');
      }
      throw error;
    }
  }

  // -------------------------------
  // Validate user for login
  // -------------------------------
  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new BadRequestException('Invalid credentials');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new BadRequestException('Invalid credentials');

    return user;
  }

  // -------------------------------
  // Login and generate JWT
  // -------------------------------
  async login(user: User) {
    const payload = { email: user.email, sub: user.id };
    return {
      message: 'Login successful',
      access_token: this.jwtService.sign(payload),
    };
  }

  // -------------------------------
  // Forgot Password
  // -------------------------------
  async forgotPassword(dto: ForgotPasswordDto) {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (!user) return { message: 'If the email exists, a reset link has been sent' };

    const token = randomBytes(32).toString('hex');
    const expires = new Date();
    expires.setHours(expires.getHours() + 1);

    await this.prisma.passwordReset.create({ data: { token, userId: user.id, expiresAt: expires } });

    const resetLink = `http://localhost:3000/reset-password?token=${token}`;

    await this.transporter.sendMail({
      from: `"App" <${this.configService.get('MAIL_FROM')}>`,
      to: user.email,
      subject: 'App - Password Reset Request',
      html: `<p>Hello ${user.email}, reset your password <a href="${resetLink}">here</a></p>`,
    });

    return { message: 'If the email exists, a reset link has been sent' };
  }

  // -------------------------------
  // Reset Password
  // -------------------------------
  async resetPassword(dto: ResetPasswordDto) {
    const reset = await this.prisma.passwordReset.findUnique({ where: { token: dto.token } });
    if (!reset || reset.expiresAt < new Date()) throw new BadRequestException('Invalid or expired token');

    const hashed = await bcrypt.hash(dto.newPassword, 10);
    const user = await this.prisma.user.update({ where: { id: reset.userId }, data: { password: hashed } });
    await this.prisma.passwordReset.delete({ where: { token: dto.token } });

    await this.transporter.sendMail({
      from: `"App" <${this.configService.get('MAIL_FROM')}>`,
      to: user.email,
      subject: 'App - Password Changed Successfully',
      html: `<p>Hello ${user.email}, your password was successfully updated</p>`,
    });

    return { message: 'Password has been reset successfully and a confirmation email has been sent' };
  }
}
