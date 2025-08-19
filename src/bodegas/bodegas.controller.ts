import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { BodegasService } from './bodegas.service';
import { Bodegas } from './entities/bodega.entity';

@Controller('bodegas')
export class BodegasController {
  constructor(private readonly bodegasService: BodegasService) {}

  @Post()
  create(@Body() data: Partial<Bodegas>) {
    return this.bodegasService.create(data);
  }

  @Get()
  findAll() {
    return this.bodegasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.bodegasService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() data: Partial<Bodegas>) {
    return this.bodegasService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.bodegasService.remove(+id);
  }
}
