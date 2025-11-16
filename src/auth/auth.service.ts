import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(data: { email: string; password: string }) {

    // 1. Rol por defecto de cliente
    const CLIENT_ROLE_ID = 'ID_DEL_ROL_CLIENT'; 

    const user = await this.usersService.createUser(
      data.email,
      data.password,
      CLIENT_ROLE_ID,
    );

    // Quitar password sin usar delete
    const { password, ...safeUser } = user;

    return {
      message: 'Cliente registrado correctamente',
      user: safeUser,
    };
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
