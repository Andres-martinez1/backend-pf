import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Modulos } from "../../modulos/Entities/modulo.entity";
import { Permisos } from "../../permisos/Entities/permiso.entity";

@Entity("opciones", { schema: "public" })
export class Opciones {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "nombre_opcion", length: 100 })
  nombreOpcion: string;

  @Column("text", { name: "descripcion", nullable: true })
  descripcion: string | null;

  @Column("character varying", { name: "ruta", nullable: true, length: 200 })
  ruta: string | null;

  @ManyToOne(() => Modulos, (modulos) => modulos.opciones)
  @JoinColumn([{ name: "id_modulo", referencedColumnName: "id" }])
  idModulo: Modulos;

  @OneToMany(() => Permisos, (permisos) => permisos.idOpcion)
  permisos: Permisos[];
}
