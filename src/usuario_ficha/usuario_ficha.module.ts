import { Module } from '@nestjs/common';
import { UsuarioFichaController } from './usuario_ficha.controller';
import { UsuarioFichaService } from './usuario_ficha.service';
import { UsuarioFicha } from './entities/usuario_ficha.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UsuarioFicha])],
  controllers: [UsuarioFichaController],
  providers: [UsuarioFichaService]
})
export class UsuarioFichaModule {}
