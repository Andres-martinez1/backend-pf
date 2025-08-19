// src/ficha/ficha.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FichaService } from './ficha.service';
import { FichaController } from './ficha.controller';
import { Ficha } from './entities/ficha.entity';
import { Municipio } from '../municipio/entities/municipio.entity';
import { Programas } from '../programas/entities/programas.entity';
import { Sedes } from '../sedes/entities/sede.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ficha, Municipio, Programas, Sedes]),
  ],
  controllers: [FichaController],
  providers: [FichaService],
  exports: [FichaService], 
})
export class FichaModule {}
