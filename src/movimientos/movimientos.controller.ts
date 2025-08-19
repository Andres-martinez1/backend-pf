import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { MovimientosService } from './movimientos.service';
import { Movimientos } from './entities/movimiento.entity';

@Controller('movimientos')
export class MovimientosController {
  constructor(private readonly movimientosService: MovimientosService) {}

  @Post()
  create(@Body() data: Partial<Movimientos>) {
    return this.movimientosService.create(data);
  }

  @Get()
  findAll() {
    return this.movimientosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.movimientosService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() data: Partial<Movimientos>) {
    return this.movimientosService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.movimientosService.remove(+id);
  }
}
