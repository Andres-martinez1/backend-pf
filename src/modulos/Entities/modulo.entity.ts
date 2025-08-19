import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Opciones } from "../../opciones/Entities/opcion.entity";

@Entity("modulos", { schema: "public" })
export class Modulos {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "nombre_modulo", length: 100 })
  nombreModulo: string;

  @OneToMany(() => Opciones, (opciones) => opciones.idModulo)
  opciones: Opciones[];
}
