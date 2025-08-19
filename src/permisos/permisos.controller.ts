import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { PermisosService } from './permisos.service';
import { Permisos } from './Entities/permiso.entity';

@Controller('permisos')
export class PermisosController {
  constructor(private readonly permisosService: PermisosService) {}

  @Get()
  findAll() {
    return this.permisosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.permisosService.findOne(+id);
  }

  @Post()
  create(@Body() data: Partial<Permisos>) {
    return this.permisosService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Partial<Permisos>) {
    return this.permisosService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.permisosService.remove(+id);
  }
}
