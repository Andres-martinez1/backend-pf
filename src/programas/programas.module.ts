import { Module } from '@nestjs/common';
import { ProgramasController } from './programas.controller';
import { ProgramasService } from './programas.service';
import { Programas } from './entities/programas.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Programas])],
  controllers: [ProgramasController],
  providers: [ProgramasService]
})
export class ProgramasModule {}
