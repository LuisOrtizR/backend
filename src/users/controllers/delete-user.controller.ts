import { Controller, Delete, Param } from '@nestjs/common';
import { DeleteUserService } from '../services/delete-user.service';

@Controller('users/delete')
export class DeleteUserController {
  constructor(private readonly deleteUserService: DeleteUserService) {}

  @Delete(':id')
  async execute(@Param('id') id: string) {
    return this.deleteUserService.execute(id);
  }
}
