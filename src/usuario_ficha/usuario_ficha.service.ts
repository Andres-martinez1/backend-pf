import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UsuarioFicha } from "./entities/usuario_ficha.entity";

@Injectable()
export class UsuarioFichaService {
  constructor(
    @InjectRepository(UsuarioFicha)
    private readonly usuarioFichaRepository: Repository<UsuarioFicha>,
  ) {}

  async create(data: Partial<UsuarioFicha>): Promise<{ message: string; data: UsuarioFicha }> {
    const nuevaRelacion = this.usuarioFichaRepository.create(data);
    await this.usuarioFichaRepository.save(nuevaRelacion);
    return {
      message: "Relación usuario-ficha creada correctamente",
      data: nuevaRelacion,
    };
  }

  async findAll(): Promise<{ message: string; data: UsuarioFicha[] }> {
    const relaciones = await this.usuarioFichaRepository.find({
      relations: ["fkIdFicha", "fkIdUsuario"],
    });
    return {
      message: "Listado de relaciones usuario-ficha obtenido correctamente",
      data: relaciones,
    };
  }

  async findOne(id: number): Promise<{ message: string; data: UsuarioFicha }> {
    const relacion = await this.usuarioFichaRepository.findOne({
      where: { id },
      relations: ["fkIdFicha", "fkIdUsuario"],
    });
    if (!relacion) {
      throw new NotFoundException("La relación usuario-ficha no fue encontrada");
    }
    return {
      message: "Relación usuario-ficha obtenida correctamente",
      data: relacion,
    };
  }

  async update(id: number, data: Partial<UsuarioFicha>): Promise<{ message: string; data: UsuarioFicha }> {
    const relacion = await this.usuarioFichaRepository.findOne({ where: { id } });
    if (!relacion) {
      throw new NotFoundException("No se puede actualizar, la relación usuario-ficha no existe");
    }
    Object.assign(relacion, data);
    await this.usuarioFichaRepository.save(relacion);
    return {
      message: "Relación usuario-ficha actualizada correctamente",
      data: relacion,
    };
  }

  async remove(id: number): Promise<{ message: string }> {
    const relacion = await this.usuarioFichaRepository.findOne({ where: { id } });
    if (!relacion) {
      throw new NotFoundException("No se puede eliminar, la relación usuario-ficha no existe");
    }
    await this.usuarioFichaRepository.remove(relacion);
    return {
      message: "Relación usuario-ficha eliminada correctamente",
    };
  }
}
