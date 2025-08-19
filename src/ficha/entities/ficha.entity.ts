import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Municipio } from "../../municipio/entities/municipio.entity";
import { Programas } from "../../programas/entities/programas.entity";
import { Sedes } from "../../sedes/entities/sede.entity";
import { UsuarioFicha } from "../../usuario_ficha/entities/usuario_ficha.entity";

@Entity("ficha", { schema: "public" })
export class Ficha {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_ficha" })
  idFicha: number;

  @Column("character varying", { name: "numero_ficha", length: 50 })
  numeroFicha: string;

  @ManyToOne(() => Municipio, (municipio) => municipio.fichas)
  @JoinColumn([
    { name: "fk_id_municipio", referencedColumnName: "idMunicipio" },
  ])
  fkIdMunicipio: Municipio;

  @ManyToOne(() => Programas, (programas) => programas.fichas)
  @JoinColumn([{ name: "fk_id_programa", referencedColumnName: "idPrograma" }])
  fkIdPrograma: Programas;

  @ManyToOne(() => Sedes, (sedes) => sedes.fichas)
  @JoinColumn([{ name: "fk_id_sede", referencedColumnName: "idSedes" }])
  fkIdSede: Sedes;

  @OneToMany(() => UsuarioFicha, (usuarioFicha) => usuarioFicha.fkIdFicha)
  usuarioFichas: UsuarioFicha[];
}
