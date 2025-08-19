import { Module } from '@nestjs/common';
import { MovimientosController } from './movimientos.controller';
import { MovimientosService } from './movimientos.service';
import { Movimientos } from './entities/movimiento.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Movimientos])],
  controllers: [MovimientosController],
  providers: [MovimientosService]
})
export class MovimientosModule {}
