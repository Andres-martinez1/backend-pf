import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BodegasService } from './bodegas.service';
import { BodegasController } from './bodegas.controller';
import { Bodegas } from './entities/bodega.entity';
import { Sedes } from '../sedes/entities/sede.entity';
import { Usuarios } from '../usuarios/entities/usuario.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Bodegas, Sedes, Usuarios]),
  ],
  controllers: [BodegasController],
  providers: [BodegasService],
  exports: [BodegasService], 
})
export class BodegasModule {}
