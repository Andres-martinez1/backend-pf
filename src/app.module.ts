import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

// ✅ Módulo para el envío de correos
import { MailerModule } from '@nestjs-modules/mailer';

import { AppController } from './app.controller';
import { AppService } from './app.service';

// --- Módulos de tu aplicación ---
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
import { BodegaElementoModule } from './bodega-elemento/bodega-elemento.module';

@Module({
  imports: [
    // ✅ Configuración para cargar variables de entorno de forma global
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // ✅ Configuración asíncrona de la conexión a la base de datos
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST'),
        port: parseInt(config.get<string>('DB_PORT', '5432')), // Valor por defecto por si no está en .env
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        autoLoadEntities: true,
        synchronize: true, // Recuerda: ideal para desarrollo, no para producción
      }),
    }),

    // ✅ Configuración del MailerModule para envío de correos
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        transport: {
          host: config.get<string>('MAIL_HOST'), // smtp.gmail.com
          port: parseInt(config.get<string>('MAIL_PORT')), // 587
          secure: false, // para el puerto 587 se usa STARTTLS
          auth: {
            user: config.get<string>('MAIL_USER'), // mariaricotrujillo1115@gmail.com
            pass: config.get<string>('MAIL_PASS'), // kibphksubxzvcmea
          },
        },
        defaults: {
          from: '"Soporte Inventario SENA" <no-reply@sena.edu.co>',
        },
      }),
    }),

    // ✅ Módulos propios de la aplicación
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