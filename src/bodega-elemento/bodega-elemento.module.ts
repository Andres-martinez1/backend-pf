import { Module } from '@nestjs/common';
import { BodegaElementoService } from './bodega-elemento.service';
import { BodegaElementoController } from './bodega-elemento.controller';

@Module({
  controllers: [BodegaElementoController],
  providers: [BodegaElementoService],
})
export class BodegaElementoModule {}
