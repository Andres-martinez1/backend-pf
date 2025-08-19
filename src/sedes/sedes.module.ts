import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SedesService } from './sedes.service';
import { SedesController } from './sedes.controller';
import { Sedes } from './entities/sede.entity';
import { Centros } from '../centros/entities/centro.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Sedes, Centros]),
  ],
  controllers: [SedesController],
  providers: [SedesService],
  exports: [SedesService],
})
export class SedesModule {}
