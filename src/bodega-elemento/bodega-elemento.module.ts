// src/bodega_elemento/bodega_elemento.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BodegaElementoService } from './bodega-elemento.service';
import { BodegaElementoController } from './bodega-elemento.controller';
import { BodegaElemento } from './entities/bodega-elemento.entity';
import { Bodegas } from '../bodegas/entities/bodega.entity';
import { Elementos } from '../elementos/entities/elemento.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([BodegaElemento, Bodegas, Elementos]),
  ],
  controllers: [BodegaElementoController],
  providers: [BodegaElementoService],
  exports: [BodegaElementoService], 
})
export class BodegaElementoModule {}
