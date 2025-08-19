import { Module } from '@nestjs/common';
import { ElementosController } from './elementos.controller';
import { ElementosService } from './elementos.service';
import { Elementos } from './entities/elemento.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Elementos])],
  controllers: [ElementosController],
  providers: [ElementosService],
  exports: [TypeOrmModule],
})
export class ElementosModule {}
