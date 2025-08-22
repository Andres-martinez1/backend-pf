import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe, UseGuards } from '@nestjs/common';
import { OpcionesService } from './opciones.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@UseGuards(JwtGuard)
@Controller('opciones')
export class OpcionesController {
  constructor(private readonly opcionesService: OpcionesService) {}

  @Post()
  async create(
    @Body('nombreOpcion') nombreOpcion: string,
    @Body('descripcion') descripcion: string,
    @Body('ruta') ruta: string,
    @Body('idModulo', ParseIntPipe) idModulo: number,
  ) {
    const result = await this.opcionesService.create(nombreOpcion, descripcion, ruta, idModulo);
    return result;
  }

  @Get()
  async findAll() {
    const result = await this.opcionesService.findAll();
    return {
      message: result.length ? 'Opciones obtenidas correctamente' : 'No hay opciones registradas',
      data: result,
    };
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const result = await this.opcionesService.findOne(id);
    return {
      message: `Opción con ID ${id} obtenida correctamente`,
      data: result,
    };
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body('nombreOpcion') nombreOpcion?: string,
    @Body('descripcion') descripcion?: string,
    @Body('ruta') ruta?: string,
    @Body('idModulo', ParseIntPipe) idModulo?: number,
  ) {
    const result = await this.opcionesService.update(id, nombreOpcion, descripcion, ruta, idModulo);
    return result;
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const result = await this.opcionesService.remove(id);
    return result;
  }
}
