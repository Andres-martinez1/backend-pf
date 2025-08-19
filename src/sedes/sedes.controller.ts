import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { SedesService } from './sedes.service';
import { Sedes } from './entities/sede.entity';

@Controller('sedes')
export class SedesController {
  constructor(private readonly sedesService: SedesService) {}

  @Post()
  create(@Body() data: Partial<Sedes>) {
    return this.sedesService.create(data);
  }

  @Get()
  findAll() {
    return this.sedesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.sedesService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() data: Partial<Sedes>) {
    return this.sedesService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.sedesService.remove(+id);
  }
}
