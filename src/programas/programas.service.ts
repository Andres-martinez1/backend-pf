import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Programas } from "./entities/programas.entity";

@Injectable()
export class ProgramasService {
  constructor(
    @InjectRepository(Programas)
    private readonly programaRepository: Repository<Programas>,
  ) {}

  async findAll(): Promise<Programas[]> {
    const programas = await this.programaRepository.find({
      relations: ["fichas"],
    });

    if (!programas || programas.length === 0) {
      throw new NotFoundException("No se encontraron programas registrados");
    }

    return programas;
  }

  async findOne(id: number): Promise<Programas> {
    const programa = await this.programaRepository.findOne({
      where: { idPrograma: id },
      relations: ["fichas"],
    });

    if (!programa) {
      throw new NotFoundException(
        `El programa con ID ${id} no existe en la base de datos`,
      );
    }

    return programa;
  }

  async create(data: Partial<Programas>): Promise<{ message: string; data: Programas }> {
    const newPrograma = this.programaRepository.create(data);
    const savedPrograma = await this.programaRepository.save(newPrograma);

    return {
      message: "Programa creado exitosamente",
      data: savedPrograma,
    };
  }

  async update(
    id: number,
    data: Partial<Programas>,
  ): Promise<{ message: string; data: Programas }> {
    const programa = await this.findOne(id);

    const updatedPrograma = await this.programaRepository.save({
      ...programa,
      ...data,
    });

    return {
      message: `El programa con ID ${id} fue actualizado correctamente`,
      data: updatedPrograma,
    };
  }

  async remove(id: number): Promise<{ message: string }> {
    const programa = await this.findOne(id);
    await this.programaRepository.remove(programa);

    return {
      message: `El programa con ID ${id} fue eliminado exitosamente`,
    };
  }
}
