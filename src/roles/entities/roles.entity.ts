import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Permisos } from "../../permisos/Entities/permiso.entity";
import { Usuarios } from "../../usuarios/entities/usuario.entity";

@Entity("roles", { schema: "public" })
export class Roles {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_rol" })
  idRol: number;

  @Column("character varying", {
    name: "nombre_rol",
    unique: true,
    length: 100,
  })
  nombreRol: string;

  @OneToMany(() => Permisos, (permisos) => permisos.idRol)
  permisos: Permisos[];

  @OneToMany(() => Usuarios, (usuarios) => usuarios.fkIdRol)
  usuarios: Usuarios[];
}
