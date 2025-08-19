import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OpcionesService } from '../opciones/opciones.service';
import { OpcionesController } from '../opciones/opciones.controller';
import { Opciones } from '../opciones/Entities/opcion.entity';
import { Modulos } from '../modulos/Entities/modulo.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Opciones, Modulos]),
  ],
  controllers: [OpcionesController],
  providers: [OpcionesService],
  exports: [OpcionesService], 
})
export class OpcionesModule {}
