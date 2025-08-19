import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Municipio } from "../../municipio/entities/municipio.entity";
import { Sedes } from "../../sedes/entities/sede.entity";

@Entity("centros", { schema: "public" })
export class Centros {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_centro" })
  idCentro: number;

  @Column("character varying", { name: "nombre_centro", length: 150 })
  nombreCentro: string;

  @ManyToOne(() => Municipio, (municipio) => municipio.centros)
  @JoinColumn([
    { name: "fk_id_municipio", referencedColumnName: "idMunicipio" },
  ])
  fkIdMunicipio: Municipio;

  @OneToMany(() => Sedes, (sedes) => sedes.fkIdCentro)
  sedes: Sedes[];
}
