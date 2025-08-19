import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ProgramasService } from './programas.service';
import { Programas } from './entities/programas.entity';

@Controller('programas')
export class ProgramasController {
  constructor(private readonly programasService: ProgramasService) {}

  @Post()
  create(@Body() data: Partial<Programas>) {
    return this.programasService.create(data);
  }

  @Get()
  findAll() {
    return this.programasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.programasService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() data: Partial<Programas>) {
    return this.programasService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.programasService.remove(+id);
  }
}
