import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { MunicipioService } from './municipio.service';
import { Municipio } from './entities/municipio.entity';

@Controller('municipio')
export class MunicipioController {
  constructor(private readonly municipiosService: MunicipioService) {}

  @Post()
  create(@Body() data: Partial<Municipio>) {
    return this.municipiosService.create(data);
  }

  @Get()
  findAll() {
    return this.municipiosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.municipiosService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() data: Partial<Municipio>) {
    return this.municipiosService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.municipiosService.remove(+id);
  }
}
