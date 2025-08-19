import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AreasModule } from './areas/areas.module';
import { BodegasModule } from './bodegas/bodegas.module';
import { CentrosModule } from './centros/centros.module';
import { ElementosModule } from './elementos/elementos.module';
import { FichaModule } from './ficha/ficha.module';
import { MovimientosModule } from './movimientos/movimientos.module';
import { MunicipioModule } from './municipio/municipio.module';
import { ProgramasModule } from './programas/programas.module';
import { RolesModule } from './roles/roles.module';
import { SedesModule } from './sedes/sedes.module';
import { SolicitudesModule } from './solicitudes/solicitudes.module';
import { UsuarioBodegaModule } from './usuario_bodega/usuario_bodega.module';
import { UsuarioFichaModule } from './usuario_ficha/usuario_ficha.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { PermisosModule } from './permisos/permisos.module';
import { OpcionesModule } from './opciones/opciones.module';
import { ModulosController } from './modulos/modulos.controller';
import { ModulosModule } from './modulos/modulos.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { BodegaElementoModule } from './bodega-elemento/bodega-elemento.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT ?? '5432'),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: true,
    }),
    AreasModule,
    BodegasModule,
    CentrosModule,
    ElementosModule,
    FichaModule,
    MovimientosModule,
    MunicipioModule,
    ProgramasModule,
    RolesModule,
    SedesModule,
    SolicitudesModule,
    UsuarioBodegaModule,
    UsuarioFichaModule,
    UsuariosModule,
    PermisosModule,
    OpcionesModule,
    ModulosModule,
    AuthModule,
    BodegaElementoModule,
  ],
  controllers: [AppController, ModulosController],
  providers: [AppService],
})
export class AppModule {}


