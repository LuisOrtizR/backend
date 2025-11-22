// app.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getWelcomeMessage(): string {
    return 'Welcome to the E-Commerce API!';
  }

  getHealthStatus() {
  const dbConnected = true;
  return {
    status: dbConnected ? 'ok' : 'fail',
    db: dbConnected,
    timestamp: new Date(),
  };
}

}