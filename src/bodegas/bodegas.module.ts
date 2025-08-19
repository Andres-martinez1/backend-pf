import { Module } from '@nestjs/common';
import { BodegasController } from './bodegas.controller';
import { BodegasService } from './bodegas.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bodegas } from './entities/bodega.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Bodegas])],
  controllers: [BodegasController],
  providers: [BodegasService],
})
export class BodegasModule {}
