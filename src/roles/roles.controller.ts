import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { RolesService } from './roles.service';
import { Roles } from './entities/roles.entity';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  create(@Body() data: Partial<Roles>) {
    return this.rolesService.create(data);
  }

  @Get()
  findAll() {
    return this.rolesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.rolesService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() data: Partial<Roles>) {
    return this.rolesService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.rolesService.remove(+id);
  }
}
