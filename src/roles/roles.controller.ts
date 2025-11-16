import { Controller, Post, Body, Get } from '@nestjs/common';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  create(@Body() body: { name: string; description?: string }) {
    return this.rolesService.create(body.name, body.description);
  }

  @Get()
  findAll() {
    return this.rolesService.findAll();
  }
}
