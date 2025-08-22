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
import { MovimientosService } from './movimientos.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@UseGuards(JwtGuard)
@Controller('movimientos')
export class MovimientosController {
  constructor(private readonly movimientosService: MovimientosService) {}

  @Get()
  async findAll() {
    const movimientos = await this.movimientosService.findAll();
    return {
      message: 'Listado de movimientos',
      data: movimientos,
    };
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const movimiento = await this.movimientosService.findOne(id);
    return {
      message: 'Movimiento encontrado',
      data: movimiento,
    };
  }

  @Post()
  async create(
    @Body()
    body: {
      tipoMovimiento: string;
      cantidad: number;
      referencia: string;
      fkIdBodegaElemento: number;
      fkIdUsuario: number;
    },
  ) {
    const movimiento = await this.movimientosService.create(
      body.tipoMovimiento,
      body.cantidad,
      body.referencia,
      body.fkIdBodegaElemento,
      body.fkIdUsuario,
    );
    return {
      message: 'Movimiento creado exitosamente',
      data: movimiento,
    };
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    body: {
      tipoMovimiento?: string;
      cantidad?: number;
      referencia?: string;
      fkIdBodegaElemento?: number;
      fkIdUsuario?: number;
    },
  ) {
    const movimiento = await this.movimientosService.update(
      id,
      body.tipoMovimiento,
      body.cantidad,
      body.referencia,
      body.fkIdBodegaElemento,
      body.fkIdUsuario,
    );
    return {
      message: 'Movimiento actualizado exitosamente',
      data: movimiento,
    };
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.movimientosService.remove(id);
    return {
      message: 'Movimiento eliminado exitosamente',
    };
  }
}
