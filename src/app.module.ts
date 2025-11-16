import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';   // 👈 AGREGADO

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // 👇 Módulos principales
    AuthModule,
    UsersModule,
    RolesModule, // 👈 IMPORTANTE
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
