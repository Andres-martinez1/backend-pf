import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { SolicitudesService } from './solicitudes.service';
import { Solicitudes } from './entities/solicitud.entity';

@Controller('solicitudes')
export class SolicitudesController {
  constructor(private readonly solicitudesService: SolicitudesService) {}

  @Post()
  create(@Body() data: Partial<Solicitudes>) {
    return this.solicitudesService.create(data);
  }

  @Get()
  findAll() {
    return this.solicitudesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.solicitudesService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() data: Partial<Solicitudes>) {
    return this.solicitudesService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.solicitudesService.remove(+id);
  }
}
