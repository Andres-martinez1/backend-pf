import { Module } from '@nestjs/common';
import { AreasController } from './areas.controller';
import { AreasService } from './areas.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Areas } from './entities/area.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Areas])],
  controllers: [AreasController],
  providers: [AreasService]
})
export class AreasModule {}
