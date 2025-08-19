import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ModulosService } from './modulos.service';
import { Modulos } from './Entities/modulo.entity';

@Controller('modulos')
export class ModulosController {
  constructor(private readonly modulosService: ModulosService) {}

  @Get()
  findAll() {
    return this.modulosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.modulosService.findOne(+id);
  }

  @Post()
  create(@Body() data: Partial<Modulos>) {
    return this.modulosService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Partial<Modulos>) {
    return this.modulosService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.modulosService.remove(+id);
  }
}
