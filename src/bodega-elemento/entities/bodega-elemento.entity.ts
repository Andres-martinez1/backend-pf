import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Bodegas } from "../../bodegas/entities/bodega.entity";
import { Elementos } from "../../elementos/entities/elemento.entity";
import { Movimientos } from "../../movimientos/entities/movimiento.entity";

@Entity("bodega_elemento", { schema: "public" })
export class BodegaElemento {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("integer", { name: "stock_actual" })
  stockActual: number;

  @Column("integer", { name: "stock_minimo", nullable: true })
  stockMinimo: number | null;

  @ManyToOne(() => Bodegas, (bodegas) => bodegas.bodegaElementos)
  @JoinColumn([{ name: "fk_id_bodega", referencedColumnName: "idBodega" }])
  fkIdBodega: Bodegas;

  @ManyToOne(() => Elementos, (elementos) => elementos.bodegaElementos)
  @JoinColumn([{ name: "fk_id_elemento", referencedColumnName: "idElemento" }])
  fkIdElemento: Elementos;

  @OneToMany(() => Movimientos, (movimientos) => movimientos.fkIdBodegaElemento)
  movimientos: Movimientos[];
}
