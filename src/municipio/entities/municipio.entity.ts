import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Centros } from "../../centros/entities/centro.entity";
import { Ficha } from "../../ficha/entities/ficha.entity";

@Entity("municipio", { schema: "public" })
export class Municipio {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_municipio" })
  idMunicipio: number;

  @Column("character varying", { name: "nombre_municipio", length: 100 })
  nombreMunicipio: string;

  @OneToMany(() => Centros, (centros) => centros.fkIdMunicipio)
  centros: Centros[];

  @OneToMany(() => Ficha, (ficha) => ficha.fkIdMunicipio)
  fichas: Ficha[];
}
