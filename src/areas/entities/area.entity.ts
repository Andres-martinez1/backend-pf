import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Sedes } from "../../sedes/entities/sede.entity";
import { Usuarios } from "../../usuarios/entities/usuario.entity";

@Entity("areas", { schema: "public" })
export class Areas {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_area" })
  idArea: number;

  @Column("character varying", { name: "nombre_area", length: 100 })
  nombreArea: string;

  @ManyToOne(() => Sedes, (sedes) => sedes.areas)
  @JoinColumn([{ name: "fk_id_sedes", referencedColumnName: "idSedes" }])
  fkIdSedes: Sedes;

  @OneToMany(() => Usuarios, (usuarios) => usuarios.fkIdArea)
  usuarios: Usuarios[];
}
