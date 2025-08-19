import {
  Injectable,
  NotFoundException,
  ConflictException,
  InternalServerErrorException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Roles } from "./entities/roles.entity";

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Roles)
    private readonly rolesRepository: Repository<Roles>,
  ) {}

  async create(nombreRol: string): Promise<{ message: string; data: Roles }> {
    try {
      const existe = await this.rolesRepository.findOne({
        where: { nombreRol },
      });
      if (existe) {
        throw new ConflictException(
          ` El rol con nombre "${nombreRol}" ya existe`,
        );
      }

      const rol = this.rolesRepository.create({ nombreRol });
      const nuevoRol = await this.rolesRepository.save(rol);

      return {
        message: ` Rol "${nuevoRol.nombreRol}" creado exitosamente`,
        data: nuevoRol,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        ` Error al crear el rol: ${error.message}`,
      );
    }
  }

  async findAll(): Promise<{ message: string; data: Roles[] }> {
    try {
      const roles = await this.rolesRepository.find({
        relations: ["permisos", "usuarios"],
      });

      return {
        message: roles.length
          ? " Lista de roles obtenida exitosamente"
          : " No se encontraron roles registrados",
        data: roles,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        ` Error al obtener los roles: ${error.message}`,
      );
    }
  }

  async findOne(id: number): Promise<{ message: string; data: Roles }> {
    try {
      const rol = await this.rolesRepository.findOne({
        where: { idRol: id },
        relations: ["permisos", "usuarios"],
      });

      if (!rol) {
        throw new NotFoundException(` No se encontró el rol con ID ${id}`);
      }

      return {
        message: ` Rol con ID ${id} encontrado`,
        data: rol,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        ` Error al obtener el rol: ${error.message}`,
      );
    }
  }

  async update(
    id: number,
    nombreRol: string,
  ): Promise<{ message: string; data: Roles }> {
    try {
      const rol = await this.rolesRepository.findOne({ where: { idRol: id } });

      if (!rol) {
        throw new NotFoundException(` No se encontró el rol con ID ${id}`);
      }

      rol.nombreRol = nombreRol;
      const rolActualizado = await this.rolesRepository.save(rol);

      return {
        message: ` Rol con ID ${id} actualizado exitosamente`,
        data: rolActualizado,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        ` Error al actualizar el rol: ${error.message}`,
      );
    }
  }

  async remove(id: number): Promise<{ message: string }> {
    try {
      const rol = await this.rolesRepository.findOne({ where: { idRol: id } });

      if (!rol) {
        throw new NotFoundException(` No se encontró el rol con ID ${id}`);
      }

      await this.rolesRepository.remove(rol);

      return {
        message: ` Rol con ID ${id} eliminado exitosamente`,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        ` Error al eliminar el rol: ${error.message}`,
      );
    }
  }
}
