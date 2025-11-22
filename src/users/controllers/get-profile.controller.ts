import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { ReqUser } from '../../auth/req-user.decorator';
import { GetProfileService } from '../services/get-profile.service';

@Controller('users/profile')
export class GetProfileController {
  constructor(private readonly getProfileService: GetProfileService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async execute(@ReqUser() user: any) {
    return this.getProfileService.execute(user.userId);
  }
}
