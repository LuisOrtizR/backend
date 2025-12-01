import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaClientExceptionFilter } from './common/filters/prisma-client-exception.filter';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe, Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const PORT = configService.get<number>('PORT') || 3000;
  const FRONTEND_URL = 'http://localhost:5173'; // Cambia si tu frontend tiene otra URL

  // Habilitar CORS para frontend
  app.enableCors({
    origin: FRONTEND_URL,
    credentials: true,
  });

  // Filtro global de errores Prisma
  app.useGlobalFilters(new PrismaClientExceptionFilter());

  // Validation global
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  await app.listen(PORT);
  Logger.log(`Application running on: http://localhost:${PORT}`, 'Bootstrap');
}
bootstrap();
