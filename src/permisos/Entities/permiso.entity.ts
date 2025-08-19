import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Opciones } from "../../opciones/Entities/opcion.entity";
import { Roles } from "../../roles/entities/roles.entity";
import { Usuarios } from "../../usuarios/entities/usuario.entity";

@Entity("permisos", { schema: "public" })
export class Permisos {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_permiso" })
  idPermiso: number;

  @Column("boolean", {
    name: "acceso_ver",
    nullable: true,
    default: () => "false",
  })
  accesoVer: boolean | null;

  @Column("boolean", {
    name: "acceso_crear",
    nullable: true,
    default: () => "false",
  })
  accesoCrear: boolean | null;

  @Column("boolean", {
    name: "acceso_editar",
    nullable: true,
    default: () => "false",
  })
  accesoEditar: boolean | null;

  @Column("boolean", {
    name: "acceso_eliminar",
    nullable: true,
    default: () => "false",
  })
  accesoEliminar: boolean | null;

  @ManyToOne(() => Opciones, (opciones) => opciones.permisos)
  @JoinColumn([{ name: "id_opcion", referencedColumnName: "id" }])
  idOpcion: Opciones;

  @ManyToOne(() => Roles, (roles) => roles.permisos)
  @JoinColumn([{ name: "id_rol", referencedColumnName: "idRol" }])
  idRol: Roles;

  @OneToMany(() => Usuarios, (usuarios) => usuarios.fkIdPermisos)
  usuarios: Usuarios[];
}
