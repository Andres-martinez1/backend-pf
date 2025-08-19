
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CentrosService } from './centros.service';
import { CentrosController } from './centros.controller';
import { Centros } from './entities/centro.entity'; 

@Module({
  imports: [TypeOrmModule.forFeature([Centros])],
  controllers: [CentrosController],
  providers: [CentrosService],
})
export class CentrosModule {}
