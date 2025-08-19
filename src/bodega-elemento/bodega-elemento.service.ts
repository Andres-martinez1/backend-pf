import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BodegaElemento } from './entities/bodega-elemento.entity';
import { Bodegas } from '../bodegas/entities/bodega.entity';
import { Elementos } from '../elementos/entities/elemento.entity';

@Injectable()
export class BodegaElementoService {
  constructor(
    @InjectRepository(BodegaElemento)
    private readonly bodegaElementoRepository: Repository<BodegaElemento>,

    @InjectRepository(Bodegas)
    private readonly bodegaRepository: Repository<Bodegas>,

    @InjectRepository(Elementos)
    private readonly elementoRepository: Repository<Elementos>,
  ) {}

  async create(stockActual: number, stockMinimo: number, bodegaId: number, elementoId: number) {
    try {
      const bodega = await this.bodegaRepository.findOne({ where: { idBodega: bodegaId } });
      if (!bodega) throw new NotFoundException(`La bodega con ID ${bodegaId} no existe`);

      const elemento = await this.elementoRepository.findOne({ where: { idElemento: elementoId } });
      if (!elemento) throw new NotFoundException(`El elemento con ID ${elementoId} no existe`);

      const nuevo = this.bodegaElementoRepository.create({
        stockActual,
        stockMinimo,
        fkIdBodega: bodega,
        fkIdElemento: elemento,
      });

      await this.bodegaElementoRepository.save(nuevo);

      return {
        message: 'Registro Bodega-Elemento creado exitosamente',
        data: nuevo,
      };
    } catch (error) {
      throw new InternalServerErrorException(error.message || 'Error al crear el registro Bodega-Elemento');
    }
  }

  async findAll() {
    try {
      const registros = await this.bodegaElementoRepository.find({
        relations: ['fkIdBodega', 'fkIdElemento', 'movimientos'],
      });
      return {
        message: 'Listado de registros Bodega-Elemento',
        data: registros,
      };
    } catch (error) {
      throw new InternalServerErrorException('Error al obtener los registros');
    }
  }

  async findOne(id: number) {
    const registro = await this.bodegaElementoRepository.findOne({
      where: { id },
      relations: ['fkIdBodega', 'fkIdElemento', 'movimientos'],
    });

    if (!registro) {
      throw new NotFoundException(`Registro Bodega-Elemento con ID ${id} no encontrado`);
    }

    return {
      message: 'Registro encontrado',
      data: registro,
    };
  }

  async update(id: number, stockActual?: number, stockMinimo?: number, bodegaId?: number, elementoId?: number) {
    try {
      const registro = await this.bodegaElementoRepository.findOne({ where: { id } });
      if (!registro) throw new NotFoundException(`Registro con ID ${id} no encontrado`);

      if (stockActual !== undefined) registro.stockActual = stockActual;
      if (stockMinimo !== undefined) registro.stockMinimo = stockMinimo;

      if (bodegaId) {
        const bodega = await this.bodegaRepository.findOne({ where: { idBodega: bodegaId } });
        if (!bodega) throw new NotFoundException(`La bodega con ID ${bodegaId} no existe`);
        registro.fkIdBodega = bodega;
      }

      if (elementoId) {
        const elemento = await this.elementoRepository.findOne({ where: { idElemento: elementoId } });
        if (!elemento) throw new NotFoundException(`El elemento con ID ${elementoId} no existe`);
        registro.fkIdElemento = elemento;
      }

      const actualizado = await this.bodegaElementoRepository.save(registro);

      return {
        message: 'Registro actualizado exitosamente',
        data: actualizado,
      };
    } catch (error) {
      throw new InternalServerErrorException(error.message || 'Error al actualizar el registro');
    }
  }

  async remove(id: number) {
    try {
      const registro = await this.bodegaElementoRepository.findOne({ where: { id } });
      if (!registro) throw new NotFoundException(`Registro con ID ${id} no encontrado`);

      await this.bodegaElementoRepository.remove(registro);

      return {
        message: 'Registro eliminado exitosamente',
      };
    } catch (error) {
      throw new InternalServerErrorException(error.message || 'Error al eliminar el registro');
    }
  }
}
