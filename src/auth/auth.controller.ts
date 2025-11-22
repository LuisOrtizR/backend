  import { Controller, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
  import { AuthService } from './auth.service';
  import { RegisterDto } from './dto/register.dto';
  import { LoginDto } from './dto/login.dto';
  import { ForgotPasswordDto } from './dto/forgot-password.dto';
  import { ResetPasswordDto } from './dto/reset-password.dto';

  @Controller('auth')
  export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    @UsePipes(new ValidationPipe({ whitelist: true }))
    register(@Body() dto: RegisterDto) {
      return this.authService.register(dto);
    }

    @Post('login')
    @UsePipes(new ValidationPipe({ whitelist: true }))
    async login(@Body() dto: LoginDto) {
      const user = await this.authService.validateUser(dto.email, dto.password);
      return this.authService.login(user);
    }

    @Post('forgot-password')
    @UsePipes(new ValidationPipe({ whitelist: true }))
    forgotPassword(@Body() dto: ForgotPasswordDto) {
      return this.authService.forgotPassword(dto);
    }

    @Post('reset-password')
    @UsePipes(new ValidationPipe({ whitelist: true }))
    resetPassword(@Body() dto: ResetPasswordDto) {
      return this.authService.resetPassword(dto);
    }
  }