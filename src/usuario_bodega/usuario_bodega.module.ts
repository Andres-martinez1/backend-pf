import { Module } from '@nestjs/common';
import { UsuarioBodegaController } from './usuario_bodega.controller';
import { UsuarioBodegaService } from './usuario_bodega.service';
import { UsuarioBodega } from './entities/usuario_bodega.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UsuarioBodega])],
  controllers: [UsuarioBodegaController],
  providers: [UsuarioBodegaService]
})
export class UsuarioBodegaModule {}
