import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permisos } from './Entities/permiso.entity';
import { Opciones } from '../opciones/Entities/opcion.entity';
import { Roles } from '../roles/entities/roles.entity';

@Injectable()
export class PermisosService {
  constructor(
    @InjectRepository(Permisos)
    private readonly permisosRepository: Repository<Permisos>,

    @InjectRepository(Opciones)
    private readonly opcionesRepository: Repository<Opciones>,

    @InjectRepository(Roles)
    private readonly rolesRepository: Repository<Roles>,
  ) {}

  async create(
    accesoVer: boolean,
    accesoCrear: boolean,
    accesoEditar: boolean,
    accesoEliminar: boolean,
    idOpcion: number,
    idRol: number,
  ) {
    try {
      const opcion = await this.opcionesRepository.findOne({ where: { id: idOpcion } });
      if (!opcion) {
        throw new NotFoundException(`La opción con ID ${idOpcion} no existe`);
      }

      const rol = await this.rolesRepository.findOne({ where: { idRol: idRol } });
      if (!rol) {
        throw new NotFoundException(`El rol con ID ${idRol} no existe`);
      }

      const permiso = this.permisosRepository.create({
        accesoVer,
        accesoCrear,
        accesoEditar,
        accesoEliminar,
        idOpcion: opcion,
        idRol: rol,
      });

      await this.permisosRepository.save(permiso);

      return {
        message: 'Permiso creado exitosamente',
        permiso,
      };
    } catch (error) {
      throw new InternalServerErrorException(error.message || 'Error al crear el permiso');
    }
  }

  async findAll() {
    try {
      return await this.permisosRepository.find({
        relations: ['idOpcion', 'idRol', 'usuarios'],
      });
    } catch (error) {
      throw new InternalServerErrorException('Error al obtener los permisos');
    }
  }

  async findOne(id: number) {
    const permiso = await this.permisosRepository.findOne({
      where: { idPermiso: id },
      relations: ['idOpcion', 'idRol', 'usuarios'],
    });

    if (!permiso) {
      throw new NotFoundException(`El permiso con ID ${id} no existe`);
    }

    return permiso;
  }

  async update(
    id: number,
    accesoVer?: boolean,
    accesoCrear?: boolean,
    accesoEditar?: boolean,
    accesoEliminar?: boolean,
    idOpcion?: number,
    idRol?: number,
  ) {
    try {
      const permiso = await this.permisosRepository.findOne({ where: { idPermiso: id } });
      if (!permiso) {
        throw new NotFoundException(`El permiso con ID ${id} no existe`);
      }

      if (accesoVer !== undefined) permiso.accesoVer = accesoVer;
      if (accesoCrear !== undefined) permiso.accesoCrear = accesoCrear;
      if (accesoEditar !== undefined) permiso.accesoEditar = accesoEditar;
      if (accesoEliminar !== undefined) permiso.accesoEliminar = accesoEliminar;

      if (idOpcion) {
        const opcion = await this.opcionesRepository.findOne({ where: { id: idOpcion } });
        if (!opcion) {
          throw new NotFoundException(`La opción con ID ${idOpcion} no existe`);
        }
        permiso.idOpcion = opcion;
      }

      if (idRol) {
        const rol = await this.rolesRepository.findOne({ where: { idRol: idRol } });
        if (!rol) {
          throw new NotFoundException(`El rol con ID ${idRol} no existe`);
        }
        permiso.idRol = rol;
      }

      await this.permisosRepository.save(permiso);

      return {
        message: 'Permiso actualizado exitosamente',
        permiso,
      };
    } catch (error) {
      throw new InternalServerErrorException(error.message || 'Error al actualizar el permiso');
    }
  }

  async remove(id: number) {
    try {
      const permiso = await this.permisosRepository.findOne({ where: { idPermiso: id } });
      if (!permiso) {
        throw new NotFoundException(`El permiso con ID ${id} no existe`);
      }

      await this.permisosRepository.remove(permiso);

      return { message: 'Permiso eliminado exitosamente' };
    } catch (error) {
      throw new InternalServerErrorException(error.message || 'Error al eliminar el permiso');
    }
  }
}
