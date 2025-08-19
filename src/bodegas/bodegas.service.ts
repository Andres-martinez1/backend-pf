import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bodegas } from './entities/bodega.entity';
import { Sedes } from '../sedes/entities/sede.entity';
import { Usuarios } from '../usuarios/entities/usuario.entity';

@Injectable()
export class BodegasService {
  constructor(
    @InjectRepository(Bodegas)
    private readonly bodegaRepository: Repository<Bodegas>,

    @InjectRepository(Sedes)
    private readonly sedeRepository: Repository<Sedes>,

    @InjectRepository(Usuarios)
    private readonly usuarioRepository: Repository<Usuarios>,
  ) {}

  async create(
    nombreBodega: string,
    sedeId: number,
    usuarioId: number,
    img?: string,
    capacidadMaxima?: number,
    descripcion?: string,
  ) {
    try {
      const sede = await this.sedeRepository.findOne({ where: { idSedes: sedeId } });
      if (!sede) {
        throw new NotFoundException(`La sede con ID ${sedeId} no existe`);
      }

      const usuario = await this.usuarioRepository.findOne({ where: { idUsuario: usuarioId } });
      if (!usuario) {
        throw new NotFoundException(`El usuario con ID ${usuarioId} no existe`);
      }

      const nuevaBodega = this.bodegaRepository.create({
        nombreBodega,
        img,
        capacidadMaxima,
        descripcion,
        fkIdSede: sede,
        fkIdUsuario: usuario,
      });

      await this.bodegaRepository.save(nuevaBodega);

      return {
        message: 'Bodega creada exitosamente',
        bodega: nuevaBodega,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        error.message || 'Error al crear la bodega',
      );
    }
  }

  async findAll() {
    try {
      const bodegas = await this.bodegaRepository.find({
        relations: ['fkIdSede', 'fkIdUsuario', 'bodegaElementos', 'usuarioBodegas'],
      });
      return bodegas;
    } catch (error) {
      throw new InternalServerErrorException('Error al obtener las bodegas');
    }
  }

  async findOne(id: number) {
    const bodega = await this.bodegaRepository.findOne({
      where: { idBodega: id },
      relations: ['fkIdSede', 'fkIdUsuario', 'bodegaElementos', 'usuarioBodegas'],
    });
    if (!bodega) {
      throw new NotFoundException(`Bodega con ID ${id} no encontrada`);
    }
    return bodega;
  }

  async update(
    id: number,
    nombreBodega?: string,
    sedeId?: number,
    usuarioId?: number,
    img?: string,
    capacidadMaxima?: number,
    descripcion?: string,
  ) {
    try {
      const bodega = await this.bodegaRepository.findOne({ where: { idBodega: id } });
      if (!bodega) {
        throw new NotFoundException(`Bodega con ID ${id} no encontrada`);
      }

      if (nombreBodega) bodega.nombreBodega = nombreBodega;
      if (img) bodega.img = img;
      if (capacidadMaxima !== undefined) bodega.capacidadMaxima = capacidadMaxima;
      if (descripcion) bodega.descripcion = descripcion;

      if (sedeId) {
        const sede = await this.sedeRepository.findOne({ where: { idSedes: sedeId } });
        if (!sede) {
          throw new NotFoundException(`La sede con ID ${sedeId} no existe`);
        }
        bodega.fkIdSede = sede;
      }

      if (usuarioId) {
        const usuario = await this.usuarioRepository.findOne({ where: { idUsuario: usuarioId } });
        if (!usuario) {
          throw new NotFoundException(`El usuario con ID ${usuarioId} no existe`);
        }
        bodega.fkIdUsuario = usuario;
      }

      await this.bodegaRepository.save(bodega);

      return {
        message: 'Bodega actualizada exitosamente',
        bodega,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        error.message || 'Error al actualizar la bodega',
      );
    }
  }

  async remove(id: number) {
    try {
      const bodega = await this.bodegaRepository.findOne({ where: { idBodega: id } });
      if (!bodega) {
        throw new NotFoundException(`Bodega con ID ${id} no encontrada`);
      }

      await this.bodegaRepository.remove(bodega);

      return { message: 'Bodega eliminada exitosamente' };
    } catch (error) {
      throw new InternalServerErrorException(
        error.message || 'Error al eliminar la bodega',
      );
    }
  }
}
