import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Elementos } from './entities/elemento.entity';

@Injectable()
export class ElementosService {
  constructor(
    @InjectRepository(Elementos)
    private readonly elementoRepository: Repository<Elementos>,
  ) {}

  async create(
    nombreElemento: string,
    clasificacion?: string,
    numeroDeSerie?: string,
    uso?: string,
    estado?: string,
    tipo?: string,
    marca?: string,
    img?: string,
    unidadDeMedida?: string,
    descripcion?: string,
    fechaVencimiento?: string,
  ) {
    try {
      const nuevoElemento = this.elementoRepository.create({
        nombreElemento,
        clasificacion,
        numeroDeSerie,
        uso,
        estado,
        tipo,
        marca,
        img,
        unidadDeMedida,
        descripcion,
        fechaVencimiento,
      });

      await this.elementoRepository.save(nuevoElemento);

      return {
        message: 'Elemento creado exitosamente',
        elemento: nuevoElemento,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        error.message || 'Error al crear el elemento',
      );
    }
  }

  async findAll() {
    try {
      return await this.elementoRepository.find({
        relations: ['bodegaElementos'],
      });
    } catch (error) {
      throw new InternalServerErrorException('Error al obtener los elementos');
    }
  }

  async findOne(id: number) {
    const elemento = await this.elementoRepository.findOne({
      where: { idElemento: id },
      relations: ['bodegaElementos'],
    });

    if (!elemento) {
      throw new NotFoundException(`Elemento con ID ${id} no encontrado`);
    }
    return elemento;
  }

  async update(
    id: number,
    nombreElemento?: string,
    clasificacion?: string,
    numeroDeSerie?: string,
    uso?: string,
    estado?: string,
    tipo?: string,
    marca?: string,
    img?: string,
    unidadDeMedida?: string,
    descripcion?: string,
    fechaVencimiento?: string,
  ) {
    try {
      const elemento = await this.elementoRepository.findOne({
        where: { idElemento: id },
      });

      if (!elemento) {
        throw new NotFoundException(`Elemento con ID ${id} no encontrado`);
      }

      if (nombreElemento) elemento.nombreElemento = nombreElemento;
      if (clasificacion) elemento.clasificacion = clasificacion;
      if (numeroDeSerie) elemento.numeroDeSerie = numeroDeSerie;
      if (uso) elemento.uso = uso;
      if (estado) elemento.estado = estado;
      if (tipo) elemento.tipo = tipo;
      if (marca) elemento.marca = marca;
      if (img) elemento.img = img;
      if (unidadDeMedida) elemento.unidadDeMedida = unidadDeMedida;
      if (descripcion) elemento.descripcion = descripcion;
      if (fechaVencimiento) elemento.fechaVencimiento = fechaVencimiento;

      await this.elementoRepository.save(elemento);

      return {
        message: 'Elemento actualizado exitosamente',
        elemento,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        error.message || 'Error al actualizar el elemento',
      );
    }
  }

  async remove(id: number) {
    try {
      const elemento = await this.elementoRepository.findOne({
        where: { idElemento: id },
      });

      if (!elemento) {
        throw new NotFoundException(`Elemento con ID ${id} no encontrado`);
      }

      await this.elementoRepository.remove(elemento);

      return { message: 'Elemento eliminado exitosamente' };
    } catch (error) {
      throw new InternalServerErrorException(
        error.message || 'Error al eliminar el elemento',
      );
    }
  }
}
