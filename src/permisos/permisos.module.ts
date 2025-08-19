import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permisos } from './Entities/permiso.entity';
import { PermisosService } from './permisos.service';
import { PermisosController } from './permisos.controller';
import { Roles } from 'src/roles/entities/roles.entity';
import { Opciones } from './../opciones/Entities/opcion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Permisos, Roles, Opciones])],
  controllers: [PermisosController],
  providers: [PermisosService],
})
export class PermisosModule {}
