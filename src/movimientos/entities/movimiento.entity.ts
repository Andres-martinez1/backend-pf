import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BodegaElemento } from "../../bodega-elemento/entities/bodega-elemento.entity";
import { Usuarios } from "../../usuarios/entities/usuario.entity";

@Entity("movimientos", { schema: "public" })
export class Movimientos {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_movimiento" })
  idMovimiento: number;

  @Column("character varying", {
    name: "tipo_movimiento",
    nullable: true,
    length: 30,
  })
  tipoMovimiento: string | null;

  @Column("integer", { name: "cantidad" })
  cantidad: number;

  @Column("timestamp without time zone", {
    name: "fecha_movimiento",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  fechaMovimiento: Date | null;

  @Column("text", { name: "referencia", nullable: true })
  referencia: string | null;

  @ManyToOne(
    () => BodegaElemento,
    (bodegaElemento) => bodegaElemento.movimientos
  )
  @JoinColumn([{ name: "fk_id_bodega_elemento", referencedColumnName: "id" }])
  fkIdBodegaElemento: BodegaElemento;

  @ManyToOne(() => Usuarios, (usuarios) => usuarios.movimientos)
  @JoinColumn([{ name: "fk_id_usuario", referencedColumnName: "idUsuario" }])
  fkIdUsuario: Usuarios;
}
