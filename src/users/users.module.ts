import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RolesService } from '../roles/roles.service';

// Services
import { CreateUserService } from './services/create-user.service';
import { ListUsersService } from './services/list-users.service';
import { GetUserService } from './services/get-user.service';
import { UpdateUserService } from './services/update-user.service';
import { DeleteUserService } from './services/delete-user.service';
import { DeactivateUserService } from './services/deactivate-user.service';
import { GetProfileService } from './services/get-profile.service';
import { UpdateProfileService } from './services/update-profile.service';

// Controllers - import individual sin usar index.ts
import { CreateUserController } from './controllers/create-user.controller';
import { ListUsersController } from './controllers/list-users.controller';
import { GetUserController } from './controllers/get-user.controller';
import { UpdateUserController } from './controllers/update-user.controller';
import { DeleteUserController } from './controllers/delete-user.controller';
import { DeactivateUserController } from './controllers/deactivate-user.controller';
import { GetProfileController } from './controllers/get-profile.controller';
import { UpdateProfileController } from './controllers/update-profile.controller';

@Module({
  providers: [
    PrismaService,
    RolesService,
    CreateUserService,
    ListUsersService,
    GetUserService,
    UpdateUserService,
    DeleteUserService,
    DeactivateUserService,
    GetProfileService,
    UpdateProfileService,
  ],
  controllers: [
    CreateUserController,
    ListUsersController,
    GetUserController,
    UpdateUserController,
    DeleteUserController,
    DeactivateUserController,
    GetProfileController,
    UpdateProfileController,
  ],
  exports: [
    PrismaService,
    RolesService,
    CreateUserService,
    ListUsersService,
    GetUserService,
    UpdateUserService,
    DeleteUserService,
    DeactivateUserService,
    GetProfileService,
    UpdateProfileService,
  ],
})
export class UsersModule {}
