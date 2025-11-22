import { Controller, Get, Param } from '@nestjs/common';
import { GetUserService } from '../services/get-user.service';

@Controller('users/get')
export class GetUserController {
  constructor(private readonly getUserService: GetUserService) {}

  @Get(':id')
  async execute(@Param('id') id: string) {
    return this.getUserService.execute(id);
  }
}
