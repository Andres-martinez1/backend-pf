import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BodegaElemento } from "../../bodega-elemento/entities/bodega-elemento.entity";

@Entity("elementos", { schema: "public" })
export class Elementos {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_elemento" })
  idElemento: number;

  @Column("character varying", { name: "nombre_elemento", length: 150 })
  nombreElemento: string;

  @Column("character varying", {
    name: "clasificacion",
    nullable: true,
    length: 100,
  })
  clasificacion: string | null;

  @Column("character varying", {
    name: "numero_de_serie",
    nullable: true,
    length: 100,
  })
  numeroDeSerie: string | null;

  @Column("character varying", { name: "uso", nullable: true, length: 100 })
  uso: string | null;

  @Column("character varying", { name: "estado", nullable: true, length: 50 })
  estado: string | null;

  @Column("character varying", { name: "tipo", nullable: true, length: 100 })
  tipo: string | null;

  @Column("character varying", { name: "marca", nullable: true, length: 100 })
  marca: string | null;

  @Column("text", { name: "img", nullable: true })
  img: string | null;

  @Column("character varying", {
    name: "unidad_de_medida",
    nullable: true,
    length: 50,
  })
  unidadDeMedida: string | null;

  @Column("text", { name: "descripcion", nullable: true })
  descripcion: string | null;

  @Column("date", { name: "fecha_vencimiento", nullable: true })
  fechaVencimiento: string | null;

  @OneToMany(
    () => BodegaElemento,
    (bodegaElemento) => bodegaElemento.fkIdElemento
  )
  bodegaElementos: BodegaElemento[];
}
