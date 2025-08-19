import { Module } from '@nestjs/common';
import { SedesController } from './sedes.controller';
import { SedesService } from './sedes.service';
import { Sedes } from './entities/sede.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Sedes])],
  controllers: [SedesController],
  providers: [SedesService]
})
export class SedesModule {}
