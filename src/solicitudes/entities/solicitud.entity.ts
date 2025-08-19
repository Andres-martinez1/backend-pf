import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Usuarios } from "../../usuarios/entities/usuario.entity";

@Entity("solicitudes", { schema: "public" })
export class Solicitudes {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_solicitud" })
  idSolicitud: number;

  @Column("character varying", {
    name: "estado_solicitud",
    nullable: true,
    length: 30,
  })
  estadoSolicitud: string | null;

  @Column("timestamp without time zone", {
    name: "fecha_solicitud",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  fechaSolicitud: Date | null;

  @Column("date", { name: "fecha_devolucion", nullable: true })
  fechaDevolucion: string | null;

  @Column("character varying", {
    name: "prioridad",
    nullable: true,
    length: 50,
  })
  prioridad: string | null;

  @Column("text", { name: "motivo", nullable: true })
  motivo: string | null;

  @Column("text", { name: "comentarios_usuario", nullable: true })
  comentariosUsuario: string | null;

  @Column("integer", { name: "cantidad", nullable: true })
  cantidad: number | null;

  @ManyToOne(() => Usuarios, (usuarios) => usuarios.solicitudes)
  @JoinColumn([
    { name: "id_usuario_solicitante", referencedColumnName: "idUsuario" },
  ])
  idUsuarioSolicitante: Usuarios;
}
