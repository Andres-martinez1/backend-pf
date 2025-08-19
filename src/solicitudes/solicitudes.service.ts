import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Solicitudes } from './entities/solicitud.entity';
import { Usuarios } from '../usuarios/entities/usuario.entity';

@Injectable()
export class SolicitudesService {
  constructor(
    @InjectRepository(Solicitudes)
    private readonly solicitudesRepository: Repository<Solicitudes>,

    @InjectRepository(Usuarios)
    private readonly usuariosRepository: Repository<Usuarios>,
  ) {}

  async create(
    estadoSolicitud: string,
    fechaDevolucion: string,
    prioridad: string,
    motivo: string,
    comentariosUsuario: string,
    cantidad: number,
    idUsuarioSolicitante: number,
  ): Promise<{ message: string; data: Solicitudes }> {
    try {
      const usuario = await this.usuariosRepository.findOne({
        where: { idUsuario: idUsuarioSolicitante },
      });
      if (!usuario) {
        throw new NotFoundException(
          `El usuario con ID ${idUsuarioSolicitante} no existe`,
        );
      }

      const solicitud = this.solicitudesRepository.create({
        estadoSolicitud,
        fechaDevolucion,
        prioridad,
        motivo,
        comentariosUsuario,
        cantidad,
        idUsuarioSolicitante: usuario,
      });

      const nuevaSolicitud = await this.solicitudesRepository.save(solicitud);

      return {
        message: 'Solicitud creada exitosamente',
        data: nuevaSolicitud,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        error.message || 'Error al crear la solicitud',
      );
    }
  }

  async findAll(): Promise<{ message: string; data: Solicitudes[] }> {
    try {
      const solicitudes = await this.solicitudesRepository.find({
        relations: ['idUsuarioSolicitante'],
      });

      return {
        message: solicitudes.length
          ? 'Lista de solicitudes obtenida exitosamente'
          : 'No se encontraron solicitudes registradas',
        data: solicitudes,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        error.message || 'Error al obtener las solicitudes',
      );
    }
  }

  async findOne(id: number): Promise<{ message: string; data: Solicitudes }> {
    try {
      const solicitud = await this.solicitudesRepository.findOne({
        where: { idSolicitud: id },
        relations: ['idUsuarioSolicitante'],
      });

      if (!solicitud) {
        throw new NotFoundException(
          `Solicitud con ID ${id} no encontrada`,
        );
      }

      return {
        message: `Solicitud con ID ${id} encontrada exitosamente`,
        data: solicitud,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        error.message || 'Error al obtener la solicitud',
      );
    }
  }

  async update(
    id: number,
    estadoSolicitud?: string,
    fechaDevolucion?: string,
    prioridad?: string,
    motivo?: string,
    comentariosUsuario?: string,
    cantidad?: number,
    idUsuarioSolicitante?: number,
  ): Promise<{ message: string; data: Solicitudes }> {
    try {
      const solicitud = await this.solicitudesRepository.findOne({
        where: { idSolicitud: id },
        relations: ['idUsuarioSolicitante'],
      });

      if (!solicitud) {
        throw new NotFoundException(
          `Solicitud con ID ${id} no encontrada`,
        );
      }

      if (estadoSolicitud) solicitud.estadoSolicitud = estadoSolicitud;
      if (fechaDevolucion) solicitud.fechaDevolucion = fechaDevolucion;
      if (prioridad) solicitud.prioridad = prioridad;
      if (motivo) solicitud.motivo = motivo;
      if (comentariosUsuario) solicitud.comentariosUsuario = comentariosUsuario;
      if (cantidad !== undefined) solicitud.cantidad = cantidad;

      if (idUsuarioSolicitante) {
        const usuario = await this.usuariosRepository.findOne({
          where: { idUsuario: idUsuarioSolicitante },
        });
        if (!usuario) {
          throw new NotFoundException(
            `El usuario con ID ${idUsuarioSolicitante} no existe`,
          );
        }
        solicitud.idUsuarioSolicitante = usuario;
      }

      const solicitudActualizada =
        await this.solicitudesRepository.save(solicitud);

      return {
        message: `Solicitud con ID ${id} actualizada exitosamente`,
        data: solicitudActualizada,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        error.message || 'Error al actualizar la solicitud',
      );
    }
  }

  async remove(id: number): Promise<{ message: string }> {
    try {
      const solicitud = await this.solicitudesRepository.findOne({
        where: { idSolicitud: id },
      });

      if (!solicitud) {
        throw new NotFoundException(
          `Solicitud con ID ${id} no encontrada`,
        );
      }

      await this.solicitudesRepository.remove(solicitud);

      return { message: `Solicitud con ID ${id} eliminada exitosamente` };
    } catch (error) {
      throw new InternalServerErrorException(
        error.message || 'Error al eliminar la solicitud',
      );
    }
  }
}
