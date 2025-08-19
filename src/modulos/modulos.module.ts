import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Modulos } from './Entities/modulo.entity';
import { ModulosService } from './modulos.service';
import { ModulosController } from './modulos.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Modulos])],
  controllers: [ModulosController],
  providers: [ModulosService],
  exports: [ModulosService],
})
export class ModulosModule {}
