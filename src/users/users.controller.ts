import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  create(@Body() body: { email: string; password: string; roleId: string }) {
    return this.usersService.createUser(body.email, body.password, body.roleId);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Get('me/profile')
  getProfile(@Body('userId') userId: string) {
    return this.usersService.getProfile(userId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() data: { email?: string; password?: string; roleId?: string }
  ) {
    return this.usersService.update(id, data);
  }

  @Patch(':id/deactivate')
  deactivate(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.usersService.delete(id);
  }
}
