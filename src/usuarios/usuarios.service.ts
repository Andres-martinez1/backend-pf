import { Injectable, NotFoundException, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Usuarios } from "./entities/usuario.entity";

@Injectable()
export class UsuariosService {
  
  constructor(
    @InjectRepository(Usuarios)
    private readonly usuariosRepository: Repository<Usuarios>,
  ) {}

  async create(data: Partial<Usuarios>): Promise<{ message: string; data: Usuarios }> {
    try {
      const nuevoUsuario = this.usuariosRepository.create(data);
      const usuarioGuardado = await this.usuariosRepository.save(nuevoUsuario);
      return {
        message: "Usuario creado correctamente",
        data: usuarioGuardado,
      };
    } catch (error) {
      throw new InternalServerErrorException(`Error al crear el usuario: ${error.message}`);
    }
  }

  async findAll(): Promise<{ message: string; data: Usuarios[] }> {
    try {
      const usuarios = await this.usuariosRepository.find({
        relations: [
          "bodegases",
          "movimientos",
          "solicitudes",
          "usuarioBodegas",
          "usuarioFichas",
          "fkIdArea",
          "fkIdPermisos",
          "fkIdRol",
        ],
      });

      return {
        message: usuarios.length
          ? "Listado de usuarios obtenido correctamente"
          : "No se encontraron usuarios registrados",
        data: usuarios,
      };
    } catch (error) {
      throw new InternalServerErrorException(`Error al obtener los usuarios: ${error.message}`);
    }
  }

  async findOne(id: number): Promise<{ message: string; data: Usuarios }> {
    try {
      const usuario = await this.usuariosRepository.findOne({
        where: { idUsuario: id },
        relations: [
          "bodegases",
          "movimientos",
          "solicitudes",
          "usuarioBodegas",
          "usuarioFichas",
          "fkIdArea",
          "fkIdPermisos",
          "fkIdRol",
        ],
      });

      if (!usuario) {
        throw new NotFoundException("El usuario no fue encontrado");
      }

      return {
        message: "Usuario obtenido correctamente",
        data: usuario,
      };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(`Error al obtener el usuario: ${error.message}`);
    }
  }

  async update(
    id: number,
    data: Partial<Usuarios>
  ): Promise<{ message: string; data: Usuarios }> {
    try {
      const usuario = await this.usuariosRepository.findOne({ where: { idUsuario: id } });

      if (!usuario) {
        throw new NotFoundException("No se puede actualizar, el usuario no existe");
      }

      Object.assign(usuario, data);
      const usuarioActualizado = await this.usuariosRepository.save(usuario);

      return {
        message: "Usuario actualizado correctamente",
        data: usuarioActualizado,
      };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(`Error al actualizar el usuario: ${error.message}`);
    }
  }

  async remove(id: number): Promise<{ message: string }> {
    try {
      const usuario = await this.usuariosRepository.findOne({ where: { idUsuario: id } });

      if (!usuario) {
        throw new NotFoundException("No se puede eliminar, el usuario no existe");
      }

      await this.usuariosRepository.remove(usuario);

      return { message: "Usuario eliminado correctamente" };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(`Error al eliminar el usuario: ${error.message}`);
    }
  }

  async findByEmail(correo: string): Promise<Usuarios | null> {
  return await this.usuariosRepository.findOne({
    where: { correo },
    relations: ["fkIdRol", "fkIdArea", "fkIdPermisos"], // relaciones necesarias
  });
}
}
