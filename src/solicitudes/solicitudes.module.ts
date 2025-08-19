import { Module } from '@nestjs/common';
import { SolicitudesController } from './solicitudes.controller';
import { SolicitudesService } from './solicitudes.service';
import { Solicitudes } from './entities/solicitud.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Solicitudes])],
  controllers: [SolicitudesController],
  providers: [SolicitudesService]
})
export class SolicitudesModule {}
