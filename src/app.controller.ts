// app.controller.ts
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // GET /
  @Get()
  getWelcome(): string {
    return this.appService.getWelcomeMessage();
  }

  // GET /health
  @Get('health')
  getHealth() {
    return this.appService.getHealthStatus();
  }
}
