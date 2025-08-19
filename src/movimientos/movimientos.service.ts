import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movimientos } from './entities/movimiento.entity';
import { BodegaElemento } from '../bodega-elemento/entities/bodega-elemento.entity';
import { Usuarios } from '../usuarios/entities/usuario.entity';

@Injectable()
export class MovimientosService {
  constructor(
    @InjectRepository(Movimientos)
    private readonly movimientosRepository: Repository<Movimientos>,

    @InjectRepository(BodegaElemento)
    private readonly bodegaElementoRepository: Repository<BodegaElemento>,

    @InjectRepository(Usuarios)
    private readonly usuarioRepository: Repository<Usuarios>,
  ) {}

  async create(
    tipoMovimiento: string,
    cantidad: number,
    referencia: string,
    fkIdBodegaElemento: number,
    fkIdUsuario: number,
  ) {
    try {
      const bodegaElemento = await this.bodegaElementoRepository.findOne({
        where: { id: fkIdBodegaElemento },
      });
      if (!bodegaElemento) {
        throw new NotFoundException(`El BodegaElemento con ID ${fkIdBodegaElemento} no existe`);
      }

      const usuario = await this.usuarioRepository.findOne({
        where: { idUsuario: fkIdUsuario },
      });
      if (!usuario) {
        throw new NotFoundException(`El Usuario con ID ${fkIdUsuario} no existe`);
      }

      const movimiento = this.movimientosRepository.create({
        tipoMovimiento,
        cantidad,
        referencia,
        fkIdBodegaElemento: bodegaElemento,
        fkIdUsuario: usuario,
      });

      await this.movimientosRepository.save(movimiento);

      return {
        message: 'Movimiento creado exitosamente',
        movimiento,
      };
    } catch (error) {
      throw new InternalServerErrorException(error.message || 'Error al crear el movimiento');
    }
  }

  async findAll() {
    try {
      return await this.movimientosRepository.find({
        relations: ['fkIdBodegaElemento', 'fkIdUsuario'],
      });
    } catch (error) {
      throw new InternalServerErrorException('Error al obtener los movimientos');
    }
  }

  async findOne(id: number) {
    const movimiento = await this.movimientosRepository.findOne({
      where: { idMovimiento: id },
      relations: ['fkIdBodegaElemento', 'fkIdUsuario'],
    });

    if (!movimiento) {
      throw new NotFoundException(`Movimiento con ID ${id} no encontrado`);
    }

    return movimiento;
  }

  async update(
    id: number,
    tipoMovimiento?: string,
    cantidad?: number,
    referencia?: string,
    fkIdBodegaElemento?: number,
    fkIdUsuario?: number,
  ) {
    try {
      const movimiento = await this.movimientosRepository.findOne({ where: { idMovimiento: id } });
      if (!movimiento) {
        throw new NotFoundException(`Movimiento con ID ${id} no encontrado`);
      }

      if (tipoMovimiento) movimiento.tipoMovimiento = tipoMovimiento;
      if (cantidad) movimiento.cantidad = cantidad;
      if (referencia) movimiento.referencia = referencia;

      if (fkIdBodegaElemento) {
        const bodegaElemento = await this.bodegaElementoRepository.findOne({ where: { id: fkIdBodegaElemento } });
        if (!bodegaElemento) {
          throw new NotFoundException(`El BodegaElemento con ID ${fkIdBodegaElemento} no existe`);
        }
        movimiento.fkIdBodegaElemento = bodegaElemento;
      }

      if (fkIdUsuario) {
        const usuario = await this.usuarioRepository.findOne({ where: { idUsuario: fkIdUsuario } });
        if (!usuario) {
          throw new NotFoundException(`El Usuario con ID ${fkIdUsuario} no existe`);
        }
        movimiento.fkIdUsuario = usuario;
      }

      await this.movimientosRepository.save(movimiento);

      return {
        message: 'Movimiento actualizado exitosamente',
        movimiento,
      };
    } catch (error) {
      throw new InternalServerErrorException(error.message || 'Error al actualizar el movimiento');
    }
  }

  async remove(id: number) {
    try {
      const movimiento = await this.movimientosRepository.findOne({ where: { idMovimiento: id } });
      if (!movimiento) {
        throw new NotFoundException(`Movimiento con ID ${id} no encontrado`);
      }

      await this.movimientosRepository.remove(movimiento);

      return { message: 'Movimiento eliminado exitosamente' };
    } catch (error) {
      throw new InternalServerErrorException(error.message || 'Error al eliminar el movimiento');
    }
  }
}
