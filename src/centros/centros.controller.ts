import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { CentrosService } from './centros.service';
import { Centros } from './entities/centro.entity';

@Controller('centros')
export class CentrosController {
  constructor(private readonly centrosService: CentrosService) {}

  @Post()
  create(@Body() data: Partial<Centros>) {
    return this.centrosService.create(data);
  }

  @Get()
  findAll() {
    return this.centrosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.centrosService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() data: Partial<Centros>) {
    return this.centrosService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.centrosService.remove(+id);
  }
}
