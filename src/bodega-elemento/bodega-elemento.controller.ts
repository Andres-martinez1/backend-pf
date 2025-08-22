import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { BodegaElementoService } from './bodega-elemento.service';
import { JwtGuard } from './../auth/guards/jwt.guard';

@UseGuards(JwtGuard)
@Controller('bodega-elemento')
export class BodegaElementoController {
  constructor(private readonly bodegaElementoService: BodegaElementoService) {}

  @Post()
  async create(
    @Body('stockActual', ParseIntPipe) stockActual: number,
    @Body('stockMinimo', ParseIntPipe) stockMinimo: number,
    @Body('bodegaId', ParseIntPipe) bodegaId: number,
    @Body('elementoId', ParseIntPipe) elementoId: number,
  ) {
    return this.bodegaElementoService.create(
      stockActual,
      stockMinimo,
      bodegaId,
      elementoId,
    );
  }

  @Get()
  async findAll() {
    return this.bodegaElementoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.bodegaElementoService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body('stockActual') stockActual?: number,
    @Body('stockMinimo') stockMinimo?: number,
    @Body('bodegaId') bodegaId?: number,
    @Body('elementoId') elementoId?: number,
  ) {
    return this.bodegaElementoService.update(
      id,
      stockActual,
      stockMinimo,
      bodegaId,
      elementoId,
    );
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.bodegaElementoService.remove(id);
  }
}
