import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Centros } from './entities/centro.entity';

@Injectable()
export class CentrosService {
  constructor(
    @InjectRepository(Centros)
    private readonly centrosRepository: Repository<Centros>,
  ) {}

  async create(data: Partial<Centros>): Promise<Centros> {
    const nuevoCentro = this.centrosRepository.create(data);
    return await this.centrosRepository.save(nuevoCentro);
  }

  async findAll(): Promise<Centros[]> {
    return await this.centrosRepository.find({
      relations: ['fkIdMunicipio', 'sedes'],
    });
  }

  async findOne(id: number): Promise<Centros> {
    const centro = await this.centrosRepository.findOne({
      where: { idCentro: id },
      relations: ['fkIdMunicipio', 'sedes'],
    });
    if (!centro) {
      throw new NotFoundException(`Centro con ID ${id} no encontrado`);
    }
    return centro;
  }

  async update(id: number, data: Partial<Centros>): Promise<Centros> {
    const centro = await this.findOne(id);
    Object.assign(centro, data);
    return await this.centrosRepository.save(centro);
  }

  async remove(id: number): Promise<void> {
    const centro = await this.findOne(id);
    await this.centrosRepository.remove(centro);
  }
}
