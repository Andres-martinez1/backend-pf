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
import { MunicipioService } from './municipio.service';

@Controller('municipios')
export class MunicipioController {
  constructor(private readonly municipioService: MunicipioService) {}

  @Get()
  async findAll() {
    const result = await this.municipioService.findAll();
    return result;
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const result = await this.municipioService.findOne(id);
    return result;
  }

  @Post()
  async create(@Body('nombreMunicipio') nombreMunicipio: string) {
    const result = await this.municipioService.create(nombreMunicipio);
    return result;
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body('nombreMunicipio') nombreMunicipio?: string,
  ) {
    const result = await this.municipioService.update(id, nombreMunicipio);
    return result;
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const result = await this.municipioService.remove(id);
    return result;
  }
}
