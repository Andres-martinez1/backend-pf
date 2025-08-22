import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { CentrosService } from './centros.service';
import { Centros } from './entities/centro.entity';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@UseGuards(JwtGuard)
@Controller('centros')
export class CentrosController {
  constructor(private readonly centrosService: CentrosService) {}

  @Post()
  async create(@Body() data: Partial<Centros>) {
    const centro = await this.centrosService.create(data);
    return {
      message: 'Centro creado exitosamente',
      data: centro,
    };
  }

  @Get()
  async findAll() {
    const centros = await this.centrosService.findAll();
    return {
      message: 'Listado de centros',
      data: centros,
    };
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const centro = await this.centrosService.findOne(id);
    return {
      message: 'Centro encontrado',
      data: centro,
    };
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: Partial<Centros>) {
    const centro = await this.centrosService.update(id, data);
    return {
      message: 'Centro actualizado exitosamente',
      data: centro,
    };
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.centrosService.remove(id);
    return {
      message: 'Centro eliminado exitosamente',
    };
  }
}
