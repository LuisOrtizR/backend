import { 
  Controller, Post, Body, Get, Param, Patch, Delete, UsePipes, ValidationPipe, UseGuards 
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ReqUser } from '../auth/req-user.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // ==================== ADMIN ENDPOINTS ====================

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async create(@Body() body: CreateUserDto) {
    const user = await this.usersService.createUser(body.email, body.password, body.roleId);
    return { message: 'User created successfully', user };
  }

  @Get()
  async findAll() {
    const users = await this.usersService.findAll();
    return { message: 'Users fetched successfully', users };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);
    return { message: 'User fetched successfully', user };
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async update(@Param('id') id: string, @Body() data: UpdateUserDto) {
    const user = await this.usersService.update(id, data);
    return { message: 'User updated successfully', user };
  }

  @Patch(':id/deactivate')
  async deactivate(@Param('id') id: string) {
    const user = await this.usersService.deactivate(id);
    return { message: 'User deactivated successfully', user };
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const user = await this.usersService.delete(id);
    return { message: 'User deleted successfully', user };
  }

  // ==================== PROFILE ENDPOINTS ====================

  @UseGuards(JwtAuthGuard)
@Get('me/profile')
async getProfile(@ReqUser() user: any) {
  const profile = await this.usersService.getProfile(user.userId);
  return { message: 'User profile fetched successfully', user: profile };
}


  @UseGuards(JwtAuthGuard)
  @Patch('me/profile')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async updateProfile(@ReqUser() user: any, @Body() data: UpdateUserDto) {
    const updated = await this.usersService.updateProfile(user.userId, data);
    return { message: 'User profile updated successfully', user: updated };
  }
}
