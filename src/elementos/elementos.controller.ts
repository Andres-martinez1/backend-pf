import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ElementosService } from './elementos.service';
import { Elementos } from './entities/elemento.entity';
import { UpdateStockDto } from './Dto/update-stock.dto';

@Controller('elementos')
export class ElementosController {
  constructor(private readonly elementosService: ElementosService) {}

  @Post()
  create(@Body() data: Partial<Elementos>) {
    return this.elementosService.create(data);
  }

  @Get()
  findAll() {
    return this.elementosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.elementosService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() data: Partial<Elementos>) {
    return this.elementosService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.elementosService.remove(+id);
  }

  @Post('stock/update')
  actualizarStock(@Body() dto: UpdateStockDto) {
    return this.elementosService.actualizarStock(dto);
  }
}
