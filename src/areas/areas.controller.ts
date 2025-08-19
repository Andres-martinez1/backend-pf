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
import { AreasService } from './areas.service';

@Controller('areas')
export class AreasController {
  constructor(private readonly areasService: AreasService) {}

  @Post()
  async create(
    @Body('nombreArea') nombreArea: string,
    @Body('sedeId', ParseIntPipe) sedeId: number,
  ) {
    return this.areasService.create(nombreArea, sedeId);
  }

  @Get()
  async findAll() {
    return this.areasService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.areasService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body('nombreArea') nombreArea?: string,
    @Body('sedeId') sedeId?: number,
  ) {
    return this.areasService.update(id, nombreArea, sedeId);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.areasService.remove(id);
  }
}
