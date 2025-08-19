import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Opciones } from './Entities/opcion.entity';
import { Modulos } from '../modulos/Entities/modulo.entity';

@Injectable()
export class OpcionesService {
  constructor(
    @InjectRepository(Opciones)
    private readonly opcionesRepository: Repository<Opciones>,

    @InjectRepository(Modulos)
    private readonly modulosRepository: Repository<Modulos>,
  ) {}

  async create(
    nombreOpcion: string,
    descripcion: string,
    ruta: string,
    idModulo: number,
  ) {
    try {
      const modulo = await this.modulosRepository.findOne({
        where: { id: idModulo },
      });
      if (!modulo) {
        throw new NotFoundException(`El Módulo con ID ${idModulo} no existe`);
      }

      const opcion = this.opcionesRepository.create({
        nombreOpcion,
        descripcion,
        ruta,
        idModulo: modulo,
      });

      await this.opcionesRepository.save(opcion);

      return {
        message: 'Opción creada exitosamente',
        opcion,
      };
    } catch (error) {
      throw new InternalServerErrorException(error.message || 'Error al crear la opción');
    }
  }

  async findAll() {
    try {
      return await this.opcionesRepository.find({
        relations: ['idModulo', 'permisos'],
      });
    } catch (error) {
      throw new InternalServerErrorException('Error al obtener las opciones');
    }
  }

  async findOne(id: number) {
    const opcion = await this.opcionesRepository.findOne({
      where: { id },
      relations: ['idModulo', 'permisos'],
    });

    if (!opcion) {
      throw new NotFoundException(`La opción con ID ${id} no existe`);
    }

    return opcion;
  }

  async update(
    id: number,
    nombreOpcion?: string,
    descripcion?: string,
    ruta?: string,
    idModulo?: number,
  ) {
    try {
      const opcion = await this.opcionesRepository.findOne({ where: { id } });
      if (!opcion) {
        throw new NotFoundException(`La opción con ID ${id} no existe`);
      }

      if (nombreOpcion) opcion.nombreOpcion = nombreOpcion;
      if (descripcion) opcion.descripcion = descripcion;
      if (ruta) opcion.ruta = ruta;

      if (idModulo) {
        const modulo = await this.modulosRepository.findOne({ where: { id: idModulo } });
        if (!modulo) {
          throw new NotFoundException(`El Módulo con ID ${idModulo} no existe`);
        }
        opcion.idModulo = modulo;
      }

      await this.opcionesRepository.save(opcion);

      return {
        message: 'Opción actualizada exitosamente',
        opcion,
      };
    } catch (error) {
      throw new InternalServerErrorException(error.message || 'Error al actualizar la opción');
    }
  }

  async remove(id: number) {
    try {
      const opcion = await this.opcionesRepository.findOne({ where: { id } });
      if (!opcion) {
        throw new NotFoundException(`La opción con ID ${id} no existe`);
      }

      await this.opcionesRepository.remove(opcion);

      return { message: 'Opción eliminada exitosamente' };
    } catch (error) {
      throw new InternalServerErrorException(error.message || 'Error al eliminar la opción');
    }
  }
}
