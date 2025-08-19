import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BodegaElemento } from "../../bodega-elemento/entities/bodega-elemento.entity";
import { Sedes } from "../../sedes/entities/sede.entity";
import { Usuarios } from "../../usuarios/entities/usuario.entity";
import { UsuarioBodega } from "../../usuario_bodega/entities/usuario_bodega.entity";

@Entity("bodegas", { schema: "public" })
export class Bodegas {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_bodega" })
  idBodega: number;

  @Column("character varying", { name: "nombre_bodega", length: 150 })
  nombreBodega: string;

  @Column("text", { name: "img", nullable: true })
  img: string | null;

  @Column("integer", { name: "capacidad_maxima", nullable: true })
  capacidadMaxima: number | null;

  @Column("text", { name: "descripcion", nullable: true })
  descripcion: string | null;

  @OneToMany(
    () => BodegaElemento,
    (bodegaElemento) => bodegaElemento.fkIdBodega
  )
  bodegaElementos: BodegaElemento[];

  @ManyToOne(() => Sedes, (sedes) => sedes.bodegases)
  @JoinColumn([{ name: "fk_id_sede", referencedColumnName: "idSedes" }])
  fkIdSede: Sedes;

  @ManyToOne(() => Usuarios, (usuarios) => usuarios.bodegases)
  @JoinColumn([{ name: "fk_id_usuario", referencedColumnName: "idUsuario" }])
  fkIdUsuario: Usuarios;

  @OneToMany(() => UsuarioBodega, (usuarioBodega) => usuarioBodega.fkIdBodega)
  usuarioBodegas: UsuarioBodega[];
}
