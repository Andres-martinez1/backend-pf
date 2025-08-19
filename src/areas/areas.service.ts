import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Areas } from './entities/area.entity';
import { Sedes } from '../sedes/entities/sede.entity';

@Injectable()
export class AreasService {
  constructor(
    @InjectRepository(Areas)
    private readonly areaRepository: Repository<Areas>,

    @InjectRepository(Sedes)
    private readonly sedeRepository: Repository<Sedes>,
  ) {}

  async create(nombreArea: string, sedeId: number) {
    try {
      const sede = await this.sedeRepository.findOne({ where: { idSedes: sedeId } });
      if (!sede) {
        throw new NotFoundException(`La sede con ID ${sedeId} no existe`);
      }

      const nuevaArea = this.areaRepository.create({ nombreArea, fkIdSedes: sede });
      await this.areaRepository.save(nuevaArea);

      return {
        message: 'Área creada exitosamente',
        area: nuevaArea,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        error.message || 'Error al crear el área',
      );
    }
  }

  async findAll() {
    try {
      const areas = await this.areaRepository.find({
        relations: ['fkIdSedes', 'usuarios'],
      });
      return areas;
    } catch (error) {
      throw new InternalServerErrorException('Error al obtener las áreas');
    }
  }

  async findOne(id: number) {
    const area = await this.areaRepository.findOne({
      where: { idArea: id },
      relations: ['fkIdSedes', 'usuarios'],
    });
    if (!area) {
      throw new NotFoundException(`Área con ID ${id} no encontrada`);
    }
    return area;
  }

  async update(id: number, nombreArea?: string, sedeId?: number) {
    try {
      const area = await this.areaRepository.findOne({ where: { idArea: id } });
      if (!area) {
        throw new NotFoundException(`Área con ID ${id} no encontrada`);
      }

      if (nombreArea) area.nombreArea = nombreArea;
      if (sedeId) {
        const sede = await this.sedeRepository.findOne({ where: { idSedes: sedeId } });
        if (!sede) {
          throw new NotFoundException(`La sede con ID ${sedeId} no existe`);
        }
        area.fkIdSedes = sede;
      }

      await this.areaRepository.save(area);

      return {
        message: 'Área actualizada exitosamente',
        area,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        error.message || 'Error al actualizar el área',
      );
    }
  }

  async remove(id: number) {
    try {
      const area = await this.areaRepository.findOne({ where: { idArea: id } });
      if (!area) {
        throw new NotFoundException(`Área con ID ${id} no encontrada`);
      }

      await this.areaRepository.remove(area);

      return { message: 'Área eliminada exitosamente' };
    } catch (error) {
      throw new InternalServerErrorException(
        error.message || 'Error al eliminar el área',
      );
    }
  }
}
