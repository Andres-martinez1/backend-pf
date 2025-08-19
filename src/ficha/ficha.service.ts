import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ficha } from './entities/ficha.entity';
import { Municipio } from '../municipio/entities/municipio.entity';
import { Programas } from '../programas/entities/programas.entity';
import { Sedes } from '../sedes/entities/sede.entity';

@Injectable()
export class FichaService {
  constructor(
    @InjectRepository(Ficha)
    private readonly fichaRepository: Repository<Ficha>,

    @InjectRepository(Municipio)
    private readonly municipioRepository: Repository<Municipio>,

    @InjectRepository(Programas)
    private readonly programaRepository: Repository<Programas>,

    @InjectRepository(Sedes)
    private readonly sedeRepository: Repository<Sedes>,
  ) {}

  async create(numeroFicha: string, municipioId: number, programaId: number, sedeId: number) {
    try {
      const municipio = await this.municipioRepository.findOne({ where: { idMunicipio: municipioId } });
      if (!municipio) throw new NotFoundException(`Municipio con ID ${municipioId} no existe`);

      const programa = await this.programaRepository.findOne({ where: { idPrograma: programaId } });
      if (!programa) throw new NotFoundException(`Programa con ID ${programaId} no existe`);

      const sede = await this.sedeRepository.findOne({ where: { idSedes: sedeId } });
      if (!sede) throw new NotFoundException(`Sede con ID ${sedeId} no existe`);

      const nuevaFicha = this.fichaRepository.create({
        numeroFicha,
        fkIdMunicipio: municipio,
        fkIdPrograma: programa,
        fkIdSede: sede,
      });

      await this.fichaRepository.save(nuevaFicha);

      return {
        message: 'Ficha creada exitosamente',
        ficha: nuevaFicha,
      };
    } catch (error) {
      throw new InternalServerErrorException(error.message || 'Error al crear la ficha');
    }
  }

  async findAll() {
    try {
      return await this.fichaRepository.find({
        relations: ['fkIdMunicipio', 'fkIdPrograma', 'fkIdSede', 'usuarioFichas'],
      });
    } catch (error) {
      throw new InternalServerErrorException('Error al obtener las fichas');
    }
  }

  async findOne(id: number) {
    const ficha = await this.fichaRepository.findOne({
      where: { idFicha: id },
      relations: ['fkIdMunicipio', 'fkIdPrograma', 'fkIdSede', 'usuarioFichas'],
    });

    if (!ficha) {
      throw new NotFoundException(`Ficha con ID ${id} no encontrada`);
    }
    return ficha;
  }

  async update(id: number, numeroFicha?: string, municipioId?: number, programaId?: number, sedeId?: number) {
    try {
      const ficha = await this.fichaRepository.findOne({ where: { idFicha: id } });
      if (!ficha) throw new NotFoundException(`Ficha con ID ${id} no encontrada`);

      if (numeroFicha) ficha.numeroFicha = numeroFicha;

      if (municipioId) {
        const municipio = await this.municipioRepository.findOne({ where: { idMunicipio: municipioId } });
        if (!municipio) throw new NotFoundException(`Municipio con ID ${municipioId} no existe`);
        ficha.fkIdMunicipio = municipio;
      }

      if (programaId) {
        const programa = await this.programaRepository.findOne({ where: { idPrograma: programaId } });
        if (!programa) throw new NotFoundException(`Programa con ID ${programaId} no existe`);
        ficha.fkIdPrograma = programa;
      }

      if (sedeId) {
        const sede = await this.sedeRepository.findOne({ where: { idSedes: sedeId } });
        if (!sede) throw new NotFoundException(`Sede con ID ${sedeId} no existe`);
        ficha.fkIdSede = sede;
      }

      await this.fichaRepository.save(ficha);

      return {
        message: 'Ficha actualizada exitosamente',
        ficha,
      };
    } catch (error) {
      throw new InternalServerErrorException(error.message || 'Error al actualizar la ficha');
    }
  }

  async remove(id: number) {
    try {
      const ficha = await this.fichaRepository.findOne({ where: { idFicha: id } });
      if (!ficha) throw new NotFoundException(`Ficha con ID ${id} no encontrada`);

      await this.fichaRepository.remove(ficha);

      return { message: 'Ficha eliminada exitosamente' };
    } catch (error) {
      throw new InternalServerErrorException(error.message || 'Error al eliminar la ficha');
    }
  }
}
