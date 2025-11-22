import { Controller, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserService } from '../services/create-user.service';
import { CreateUserDto } from '../dto/create-user.dto';

@Controller('users/create')
export class CreateUserController {
  constructor(private readonly createUserService: CreateUserService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async execute(@Body() body: CreateUserDto) {
    return this.createUserService.execute(body.email, body.password, body.roleId);
  }
}
