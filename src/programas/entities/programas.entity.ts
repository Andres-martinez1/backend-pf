import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Ficha } from "../../ficha/entities/ficha.entity";

@Entity("programas", { schema: "public" })
export class Programas {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_programa" })
  idPrograma: number;

  @Column("character varying", { name: "nombre_programa", length: 150 })
  nombrePrograma: string;

  @OneToMany(() => Ficha, (ficha) => ficha.fkIdPrograma)
  fichas: Ficha[];
}
