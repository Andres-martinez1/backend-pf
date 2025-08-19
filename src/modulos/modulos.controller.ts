import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { ModulosService } from './modulos.service';
import { Modulos } from './Entities/modulo.entity';

@Controller('modulos')
export class ModulosController {
  constructor(private readonly modulosService: ModulosService) {}

  @Get()
  async findAll() {
    const modulos = await this.modulosService.findAll();
    return {
      message: 'Listado de módulos',
      data: modulos,
    };
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const modulo = await this.modulosService.findOne(id);
    return {
      message: 'Módulo encontrado',
      data: modulo,
    };
  }

  @Post()
  async create(@Body() data: Partial<Modulos>) {
    const modulo = await this.modulosService.create(data);
    return {
      message: 'Módulo creado exitosamente',
      data: modulo,
    };
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Partial<Modulos>,
  ) {
    const modulo = await this.modulosService.update(id, data);
    return {
      message: 'Módulo actualizado exitosamente',
      data: modulo,
    };
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.modulosService.remove(id);
    return {
      message: 'Módulo eliminado exitosamente',
    };
  }
}
