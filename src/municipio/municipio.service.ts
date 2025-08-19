import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Municipio } from './entities/municipio.entity';

@Injectable()
export class MunicipioService {
  constructor(
    @InjectRepository(Municipio)
    private readonly municipioRepository: Repository<Municipio>,
  ) {}

  async create(nombreMunicipio: string) {
    try {
      const municipio = this.municipioRepository.create({ nombreMunicipio });
      await this.municipioRepository.save(municipio);

      return {
        message: ' Municipio creado exitosamente',
        municipio,
      };
    } catch (error) {
      throw new InternalServerErrorException(error.message || ' Error al crear el municipio');
    }
  }

  async findAll() {
    try {
      const municipios = await this.municipioRepository.find({
        relations: ['centros', 'fichas'],
      });

      return {
        message: ' Lista de municipios obtenida correctamente',
        data: municipios,
      };
    } catch (error) {
      throw new InternalServerErrorException('Error al obtener los municipios');
    }
  }

  async findOne(id: number) {
    try {
      const municipio = await this.municipioRepository.findOne({
        where: { idMunicipio: id },
        relations: ['centros', 'fichas'],
      });

      if (!municipio) {
        throw new NotFoundException(` Municipio con ID ${id} no encontrado`);
      }

      return {
        message: ` Municipio con ID ${id} encontrado`,
        data: municipio,
      };
    } catch (error) {
      throw new InternalServerErrorException(error.message || ' Error al obtener el municipio');
    }
  }

  async update(id: number, nombreMunicipio?: string) {
    try {
      const municipio = await this.municipioRepository.findOne({
        where: { idMunicipio: id },
      });

      if (!municipio) {
        throw new NotFoundException(` Municipio con ID ${id} no encontrado`);
      }

      if (nombreMunicipio) municipio.nombreMunicipio = nombreMunicipio;

      await this.municipioRepository.save(municipio);

      return {
        message: ` Municipio con ID ${id} actualizado correctamente`,
        municipio,
      };
    } catch (error) {
      throw new InternalServerErrorException(error.message || ' Error al actualizar el municipio');
    }
  }

  async remove(id: number) {
    try {
      const municipio = await this.municipioRepository.findOne({
        where: { idMunicipio: id },
      });

      if (!municipio) {
        throw new NotFoundException(` Municipio con ID ${id} no encontrado`);
      }

      await this.municipioRepository.remove(municipio);

      return { message: ` Municipio con ID ${id} eliminado exitosamente` };
    } catch (error) {
      throw new InternalServerErrorException(error.message || ' Error al eliminar el municipio');
    }
  }
}
