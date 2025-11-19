import { Controller, Post, Body, Get, Delete } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { AssignPermissionDto } from './dto/assign-permission.dto';

@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Post()
  create(@Body() dto: CreatePermissionDto) {
    return this.permissionsService.create(dto.name, dto.description);
  }

  @Get()
  findAll() {
    return this.permissionsService.findAll();
  }

  @Post('assign')
  assign(@Body() dto: AssignPermissionDto) {
    return this.permissionsService.assignPermissionToRole(dto.roleId, dto.permissionId);
  }

  @Delete('remove')
  remove(@Body() dto: AssignPermissionDto) {
    return this.permissionsService.removePermissionFromRole(dto.roleId, dto.permissionId);
  }
}
