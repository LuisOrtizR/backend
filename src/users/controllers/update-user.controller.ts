import { Controller, Patch, Body, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { UpdateUserService } from '../services/update-user.service';
import { UpdateUserDto } from '../dto/update-user.dto';

@Controller('users/update')
export class UpdateUserController {
  constructor(private readonly updateUserService: UpdateUserService) {}

  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async execute(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.updateUserService.execute(id, body);
  }
}
