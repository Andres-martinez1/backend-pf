import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sedes } from './entities/sede.entity';
import { Centros } from '../centros/entities/centro.entity';

@Injectable()
export class SedesService {
  constructor(
    @InjectRepository(Sedes)
    private readonly sedeRepository: Repository<Sedes>,

    @InjectRepository(Centros)
    private readonly centroRepository: Repository<Centros>,
  ) {}

  async create(nombreSede: string, centroId: number) {
    try {
      const centro = await this.centroRepository.findOne({ where: { idCentro: centroId } });
      if (!centro) {
        throw new NotFoundException(`El centro con ID ${centroId} no existe`);
      }

      const nuevaSede = this.sedeRepository.create({ nombreSede, fkIdCentro: centro });
      await this.sedeRepository.save(nuevaSede);

      return {
        message: 'Sede creada exitosamente',
        sede: nuevaSede,
      };
    } catch (error) {
      throw new InternalServerErrorException(error.message || 'Error al crear la sede');
    }
  }

  async findAll() {
    try {
      const sedes = await this.sedeRepository.find({
        relations: ['areas', 'bodegases', 'fichas', 'fkIdCentro'],
      });
      return sedes;
    } catch (error) {
      throw new InternalServerErrorException('Error al obtener las sedes');
    }
  }

  async findOne(id: number) {
    const sede = await this.sedeRepository.findOne({
      where: { idSedes: id },
      relations: ['areas', 'bodegases', 'fichas', 'fkIdCentro'],
    });

    if (!sede) {
      throw new NotFoundException(`Sede con ID ${id} no encontrada`);
    }

    return sede;
  }

  async update(id: number, nombreSede?: string, centroId?: number) {
    try {
      const sede = await this.sedeRepository.findOne({ where: { idSedes: id } });
      if (!sede) {
        throw new NotFoundException(`Sede con ID ${id} no encontrada`);
      }

      if (nombreSede) sede.nombreSede = nombreSede;
      if (centroId) {
        const centro = await this.centroRepository.findOne({ where: { idCentro: centroId } });
        if (!centro) {
          throw new NotFoundException(`El centro con ID ${centroId} no existe`);
        }
        sede.fkIdCentro = centro;
      }

      await this.sedeRepository.save(sede);

      return {
        message: 'Sede actualizada exitosamente',
        sede,
      };
    } catch (error) {
      throw new InternalServerErrorException(error.message || 'Error al actualizar la sede');
    }
  }

  async remove(id: number) {
    try {
      const sede = await this.sedeRepository.findOne({ where: { idSedes: id } });
      if (!sede) {
        throw new NotFoundException(`Sede con ID ${id} no encontrada`);
      }

      await this.sedeRepository.remove(sede);

      return { message: 'Sede eliminada exitosamente' };
    } catch (error) {
      throw new InternalServerErrorException(error.message || 'Error al eliminar la sede');
    }
  }
}
