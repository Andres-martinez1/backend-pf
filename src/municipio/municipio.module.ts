import { Module } from '@nestjs/common';
import { MunicipioController } from './municipio.controller';
import { MunicipioService } from './municipio.service';
import { Municipio } from './entities/municipio.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Municipio])],
  controllers: [MunicipioController],
  providers: [MunicipioService]
})
export class MunicipioModule {}
