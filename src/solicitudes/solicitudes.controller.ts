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
import { SolicitudesService } from './solicitudes.service';
import { Solicitudes } from './entities/solicitud.entity';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@UseGuards(JwtGuard)
@Controller('solicitudes')
export class SolicitudesController {
  constructor(private readonly solicitudesService: SolicitudesService) {}

  @Get()
  async findAll(): Promise<{ message: string; data: Solicitudes[] }> {
    return await this.solicitudesService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ message: string; data: Solicitudes }> {
    return await this.solicitudesService.findOne(id);
  }

  @Post()
  async create(
    @Body('estadoSolicitud') estadoSolicitud: string,
    @Body('fechaDevolucion') fechaDevolucion: string,
    @Body('prioridad') prioridad: string,
    @Body('motivo') motivo: string,
    @Body('comentariosUsuario') comentariosUsuario: string,
    @Body('cantidad', ParseIntPipe) cantidad: number,
    @Body('idUsuarioSolicitante', ParseIntPipe) idUsuarioSolicitante: number,
  ): Promise<{ message: string; data: Solicitudes }> {
    return await this.solicitudesService.create(
      estadoSolicitud,
      fechaDevolucion,
      prioridad,
      motivo,
      comentariosUsuario,
      cantidad,
      idUsuarioSolicitante,
    );
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body('estadoSolicitud') estadoSolicitud?: string,
    @Body('fechaDevolucion') fechaDevolucion?: string,
    @Body('prioridad') prioridad?: string,
    @Body('motivo') motivo?: string,
    @Body('comentariosUsuario') comentariosUsuario?: string,
    @Body('cantidad', ParseIntPipe) cantidad?: number,
    @Body('idUsuarioSolicitante', ParseIntPipe) idUsuarioSolicitante?: number,
  ): Promise<{ message: string; data: Solicitudes }> {
    return await this.solicitudesService.update(
      id,
      estadoSolicitud,
      fechaDevolucion,
      prioridad,
      motivo,
      comentariosUsuario,
      cantidad,
      idUsuarioSolicitante,
    );
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ message: string }> {
    return await this.solicitudesService.remove(id);
  }
}
