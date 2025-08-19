import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Modulos } from './Entities/modulo.entity';

@Injectable()
export class ModulosService {
  constructor(
    @InjectRepository(Modulos)
    private readonly moduloRepository: Repository<Modulos>,
  ) {}

  async findAll(): Promise<Modulos[]> {
    return await this.moduloRepository.find({
      relations: ['opciones'], 
    });
  }

  async findOne(id: number): Promise<Modulos> {
    const modulo = await this.moduloRepository.findOne({
      where: { id },
      relations: ['opciones'],
    });

    if (!modulo) {
      throw new NotFoundException(`Modulo con ID ${id} no encontrado`);
    }

    return modulo;
  }

  async create(data: Partial<Modulos>): Promise<Modulos> {
    const modulo = this.moduloRepository.create(data);
    return await this.moduloRepository.save(modulo);
  }

  async update(id: number, data: Partial<Modulos>): Promise<Modulos> {
    const modulo = await this.findOne(id);
    Object.assign(modulo, data);
    return await this.moduloRepository.save(modulo);
  }

  async remove(id: number): Promise<void> {
    const modulo = await this.findOne(id);
    await this.moduloRepository.remove(modulo);
  }
}
