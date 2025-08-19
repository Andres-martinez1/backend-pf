import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AreasService } from './areas.service';
import { AreasController } from './areas.controller';
import { Areas } from './entities/area.entity';
import { Sedes } from '../sedes/entities/sede.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Areas, Sedes]),
  ],
  controllers: [AreasController],
  providers: [AreasService],
  exports: [AreasService], 
})
export class AreasModule {}
