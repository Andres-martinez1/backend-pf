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
import { FichaService } from './ficha.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@UseGuards(JwtGuard)
@Controller('fichas')
export class FichaController {
  constructor(private readonly fichaService: FichaService) {}

  @Post()
  async create(
    @Body('numeroFicha') numeroFicha: string,
    @Body('municipioId', ParseIntPipe) municipioId: number,
    @Body('programaId', ParseIntPipe) programaId: number,
    @Body('sedeId', ParseIntPipe) sedeId: number,
  ) {
    const ficha = await this.fichaService.create(
      numeroFicha,
      municipioId,
      programaId,
      sedeId,
    );

    return {
      message: 'Ficha creada exitosamente',
      data: ficha,
    };
  }

  @Get()
  async findAll() {
    const fichas = await this.fichaService.findAll();
    return {
      message: 'Listado de fichas',
      data: fichas,
    };
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const ficha = await this.fichaService.findOne(id);
    return {
      message: 'Ficha encontrada',
      data: ficha,
    };
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body('numeroFicha') numeroFicha?: string,
    @Body('municipioId', ParseIntPipe) municipioId?: number,
    @Body('programaId', ParseIntPipe) programaId?: number,
    @Body('sedeId', ParseIntPipe) sedeId?: number,
  ) {
    const ficha = await this.fichaService.update(
      id,
      numeroFicha,
      municipioId,
      programaId,
      sedeId,
    );

    return {
      message: 'Ficha actualizada exitosamente',
      data: ficha,
    };
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.fichaService.remove(id);
    return {
      message: 'Ficha eliminada exitosamente',
    };
  }
}
export { FichaService };

