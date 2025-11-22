import { Controller, Patch, Param } from '@nestjs/common';
import { DeactivateUserService } from '../services/deactivate-user.service';

@Controller('users/deactivate')
export class DeactivateUserController {
  constructor(private readonly deactivateUserService: DeactivateUserService) {}

  @Patch(':id')
  async execute(@Param('id') id: string) {
    return this.deactivateUserService.execute(id);
  }
}
