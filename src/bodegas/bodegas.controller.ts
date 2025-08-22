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
import { BodegasService } from './bodegas.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@UseGuards(JwtGuard)
@Controller('bodegas')
export class BodegasController {
  constructor(private readonly bodegasService: BodegasService) {}

  @Post()
  async create(
    @Body('nombreBodega') nombreBodega: string,
    @Body('sedeId', ParseIntPipe) sedeId: number,
    @Body('usuarioId', ParseIntPipe) usuarioId: number,
    @Body('img') img?: string,
    @Body('capacidadMaxima') capacidadMaxima?: number,
    @Body('descripcion') descripcion?: string,
  ) {
    return this.bodegasService.create(
      nombreBodega,
      sedeId,
      usuarioId,
      img,
      capacidadMaxima,
      descripcion,
    );
  }

  @Get()
  async findAll() {
    return this.bodegasService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.bodegasService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body('nombreBodega') nombreBodega?: string,
    @Body('sedeId') sedeId?: number,
    @Body('usuarioId') usuarioId?: number,
    @Body('img') img?: string,
    @Body('capacidadMaxima') capacidadMaxima?: number,
    @Body('descripcion') descripcion?: string,
  ) {
    return this.bodegasService.update(
      id,
      nombreBodega,
      sedeId,
      usuarioId,
      img,
      capacidadMaxima,
      descripcion,
    );
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.bodegasService.remove(id);
  }
}
