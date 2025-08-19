import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Areas } from "../../areas/entities/area.entity";
import { Bodegas } from "../../bodegas/entities/bodega.entity";
import { Ficha } from "../../ficha/entities/ficha.entity";
import { Centros } from "../../centros/entities/centro.entity";

@Entity("sedes", { schema: "public" })
export class Sedes {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_sedes" })
  idSedes: number;

  @Column("character varying", { name: "nombre_sede", length: 150 })
  nombreSede: string;

  @OneToMany(() => Areas, (areas) => areas.fkIdSedes)
  areas: Areas[];

  @OneToMany(() => Bodegas, (bodegas) => bodegas.fkIdSede)
  bodegases: Bodegas[];

  @OneToMany(() => Ficha, (ficha) => ficha.fkIdSede)
  fichas: Ficha[];

  @ManyToOne(() => Centros, (centros) => centros.sedes)
  @JoinColumn([{ name: "fk_id_centro", referencedColumnName: "idCentro" }])
  fkIdCentro: Centros;
}
