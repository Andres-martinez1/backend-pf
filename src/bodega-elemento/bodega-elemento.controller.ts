import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BodegaElementoService } from './bodega-elemento.service';
import { CreateBodegaElementoDto } from './dto/create-bodega-elemento.dto';
import { UpdateBodegaElementoDto } from './dto/update-bodega-elemento.dto';

@Controller('bodega-elemento')
export class BodegaElementoController {
  constructor(private readonly bodegaElementoService: BodegaElementoService) {}

  @Post()
  create(@Body() createBodegaElementoDto: CreateBodegaElementoDto) {
    return this.bodegaElementoService.create(createBodegaElementoDto);
  }

  @Get()
  findAll() {
    return this.bodegaElementoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bodegaElementoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBodegaElementoDto: UpdateBodegaElementoDto) {
    return this.bodegaElementoService.update(+id, updateBodegaElementoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bodegaElementoService.remove(+id);
  }
}
