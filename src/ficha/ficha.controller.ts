import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { FichaService } from './ficha.service';
import { Ficha } from './entities/ficha.entity';

@Controller('ficha')
export class FichaController {
  constructor(private readonly fichaService: FichaService) {}

  @Post()
  create(@Body() data: Partial<Ficha>) {
    return this.fichaService.create(data);
  }

  @Get()
  findAll() {
    return this.fichaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.fichaService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() data: Partial<Ficha>) {
    return this.fichaService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.fichaService.remove(+id);
  }
}
