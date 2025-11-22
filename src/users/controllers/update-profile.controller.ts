import { Controller, Patch, Body, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { ReqUser } from '../../auth/req-user.decorator';
import { UpdateProfileService } from '../services/update-profile.service';
import { UpdateUserDto } from '../dto/update-user.dto';

@Controller('users/profile/update')
export class UpdateProfileController {
  constructor(private readonly updateProfileService: UpdateProfileService) {}

  @UseGuards(JwtAuthGuard)
  @Patch()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async execute(@ReqUser() user: any, @Body() body: UpdateUserDto) {
    return this.updateProfileService.execute(user.userId, body);
  }
}
