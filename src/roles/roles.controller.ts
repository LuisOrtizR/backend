import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { AssignRoleDto } from './dto/assign-role.dto';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  // Crear rol
  @Post()
  create(@Body() dto: CreateRoleDto) {
    return this.rolesService.create(dto.name, dto.description);
  }

  // Listar roles con permisos
  @Get()
  findAll() {
    return this.rolesService.findAll();
  }

  // 🔥 Rutas específicas primero (evita conflictos con :id)
  @Post('assign')
  assignRole(@Body() dto: AssignRoleDto) {
    return this.rolesService.assignRoleToUser(dto.userId, dto.roleId);
  }

  @Delete('remove')
  removeRole(@Body() dto: AssignRoleDto) {
    return this.rolesService.removeRoleFromUser(dto.userId, dto.roleId);
  }

  // 🔥 Luego las rutas dinámicas con :id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rolesService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: CreateRoleDto) {
    return this.rolesService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rolesService.remove(id);
  }
}
