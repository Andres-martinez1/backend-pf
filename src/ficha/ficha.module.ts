import { Module } from '@nestjs/common';
import { FichaController } from './ficha.controller';
import { FichaService } from './ficha.service';
import { Ficha } from './entities/ficha.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Ficha])],
  controllers: [FichaController],
  providers: [FichaService]
})
export class FichaModule {}
