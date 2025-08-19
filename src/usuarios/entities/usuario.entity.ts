import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Bodegas } from "../../bodegas/entities/bodega.entity";
import { Solicitudes } from "../../solicitudes/entities/solicitud.entity";
import { UsuarioBodega } from "../../usuario_bodega/entities/usuario_bodega.entity";
import { UsuarioFicha } from "../../usuario_ficha/entities/usuario_ficha.entity";
import { Areas } from "../../areas/entities/area.entity";
import { Permisos } from "../../permisos/Entities/permiso.entity";
import { Roles } from "../../roles/entities/roles.entity";
import { Movimientos } from "../../movimientos/entities/movimiento.entity";


@Entity("usuarios", { schema: "public" })
export class Usuarios {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_usuario" })
  idUsuario: number;

  @Column("character varying", {
    name: "identificacion",
    unique: true,
    length: 50,
  })
  identificacion: string;

  @Column("character varying", { name: "nombres", length: 100 })
  nombres: string;

  @Column("character varying", { name: "apellidos", length: 100 })
  apellidos: string;

  @Column("character varying", { name: "correo", unique: true, length: 150 })
  correo: string;

  @Column("text", { name: "password" })
  password: string;

  @Column("text", { name: "img", nullable: true })
  img: string | null;

  @Column("character varying", { name: "estado", nullable: true, length: 20 })
  estado: string | null;

  @Column("character varying", {
    name: "ubicacion",
    nullable: true,
    length: 150,
  })
  ubicacion: string | null;

  @Column("date", { name: "fecha_ingreso", nullable: true })
  fechaIngreso: string | null;

  @Column("text", { name: "habilidades_tecnicas", nullable: true })
  habilidadesTecnicas: string | null;

  @OneToMany(() => Bodegas, (bodegas) => bodegas.fkIdUsuario)
  bodegases: Bodegas[];

  @OneToMany(() => Movimientos, (movimientos) => movimientos.fkIdUsuario)
  movimientos: Movimientos[];

  @OneToMany(
    () => Solicitudes,
    (solicitudes) => solicitudes.idUsuarioSolicitante
  )
  solicitudes: Solicitudes[];

  @OneToMany(() => UsuarioBodega, (usuarioBodega) => usuarioBodega.fkIdUsuario)
  usuarioBodegas: UsuarioBodega[];

  @OneToMany(() => UsuarioFicha, (usuarioFicha) => usuarioFicha.fkIdUsuario)
  usuarioFichas: UsuarioFicha[];

  @ManyToOne(() => Areas, (areas) => areas.usuarios)
  @JoinColumn([{ name: "fk_id_area", referencedColumnName: "idArea" }])
  fkIdArea: Areas;

  @ManyToOne(() => Permisos, (permisos) => permisos.usuarios)
  @JoinColumn([{ name: "fk_id_permisos", referencedColumnName: "idPermiso" }])
  fkIdPermisos: Permisos;

  @ManyToOne(() => Roles, (roles) => roles.usuarios)
  @JoinColumn([{ name: "fk_id_rol", referencedColumnName: "idRol" }])
  fkIdRol: Roles;
}
