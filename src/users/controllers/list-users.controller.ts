import { Controller, Get } from '@nestjs/common';
import { ListUsersService } from '../services/list-users.service';

@Controller('users/list')
export class ListUsersController {
  constructor(private readonly listUsersService: ListUsersService) {}

  @Get()
  async execute() {
    return this.listUsersService.execute();
  }
}
