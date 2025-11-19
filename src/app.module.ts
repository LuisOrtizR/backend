import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

// MÓDULOS
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { PermissionsModule } from './permission/permissions.module'; // 👈 ESTE FALTABA

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // Módulos principales
    AuthModule,
    UsersModule,
    RolesModule,
    PermissionsModule, // 👈 AGREGADO
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
