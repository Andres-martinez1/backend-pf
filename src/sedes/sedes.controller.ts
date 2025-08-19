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
import { SedesService } from './sedes.service';
import { Sedes } from './entities/sede.entity';

@Controller('sedes')
export class SedesController {
  constructor(private readonly sedesService: SedesService) {}

  @Get()
  async findAll(): Promise<Sedes[]> {
    return await this.sedesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Sedes> {
    return await this.sedesService.findOne(id);
  }

  @Post()
  async create(
    @Body('nombreSede') nombreSede: string,
    @Body('centroId', ParseIntPipe) centroId: number,
  ): Promise<{ message: string; sede: Sedes }> {
    return await this.sedesService.create(nombreSede, centroId);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body('nombreSede') nombreSede?: string,
    @Body('centroId', ParseIntPipe) centroId?: number,
  ): Promise<{ message: string; sede: Sedes }> {
    return await this.sedesService.update(id, nombreSede, centroId);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    return await this.sedesService.remove(id);
  }
}
