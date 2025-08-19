import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuarioBodega } from './entities/usuario_bodega.entity';

@Injectable()
export class UsuarioBodegaService {
  constructor(
    @InjectRepository(UsuarioBodega)
    private readonly usuarioBodegaRepository: Repository<UsuarioBodega>,
  ) {}

  async create(data: Partial<UsuarioBodega>) {
    const nuevaRelacion = this.usuarioBodegaRepository.create(data);
    await this.usuarioBodegaRepository.save(nuevaRelacion);

    return {
      message: ' Relación Usuario-Bodega creada exitosamente',
      data: nuevaRelacion,
    };
  }

  async findAll() {
    const relaciones = await this.usuarioBodegaRepository.find({
      relations: ['fkIdBodega', 'fkIdUsuario'],
    });

    return {
      message: '📋 Lista de relaciones Usuario-Bodega obtenida correctamente',
      data: relaciones,
    };
  }

  async findOne(id: number) {
    const relacion = await this.usuarioBodegaRepository.findOne({
      where: { id },
      relations: ['fkIdBodega', 'fkIdUsuario'],
    });

    if (!relacion) {
      throw new NotFoundException(
        `❌ No se encontró la relación con ID ${id}`,
      );
    }

    return {
      message: ' Relación Usuario-Bodega encontrada',
      data: relacion,
    };
  }

  async update(id: number, data: Partial<UsuarioBodega>) {
    const relacion = await this.usuarioBodegaRepository.findOne({ where: { id } });

    if (!relacion) {
      throw new NotFoundException(
        ` No se puede actualizar, no existe relación con ID ${id}`,
      );
    }

    await this.usuarioBodegaRepository.update(id, data);

    return {
      message: ' Relación Usuario-Bodega actualizada exitosamente',
      data: await this.usuarioBodegaRepository.findOne({
        where: { id },
        relations: ['fkIdBodega', 'fkIdUsuario'],
      }),
    };
  }

  async remove(id: number) {
    const relacion = await this.usuarioBodegaRepository.findOne({ where: { id } });

    if (!relacion) {
      throw new NotFoundException(
        ` No se puede eliminar, no existe relación con ID ${id}`,
      );
    }

    await this.usuarioBodegaRepository.delete(id);

    return {
      message: ' Relación Usuario-Bodega eliminada exitosamente',
      id,
    };
  }
}
