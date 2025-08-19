import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { AreasService } from './areas.service';
import { Areas } from './entities/area.entity';

@Controller('areas')
export class AreasController {
  constructor(private readonly areasService: AreasService) {}

  @Post()
  create(@Body() data: Partial<Areas>) {
    return this.areasService.create(data);
  }

  @Get()
  findAll() {
    return this.areasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.areasService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() data: Partial<Areas>) {
    return this.areasService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.areasService.remove(+id);
  }
}
