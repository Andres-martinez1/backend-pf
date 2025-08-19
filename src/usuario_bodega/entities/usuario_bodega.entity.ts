import {
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Bodegas } from "../../bodegas/entities/bodega.entity";
import { Usuarios } from "../../usuarios/entities/usuario.entity";

@Entity("usuario_bodega", { schema: "public" })
export class UsuarioBodega {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @ManyToOne(() => Bodegas, (bodegas) => bodegas.usuarioBodegas)
  @JoinColumn([{ name: "fk_id_bodega", referencedColumnName: "idBodega" }])
  fkIdBodega: Bodegas;

  @ManyToOne(() => Usuarios, (usuarios) => usuarios.usuarioBodegas)
  @JoinColumn([{ name: "fk_id_usuario", referencedColumnName: "idUsuario" }])
  fkIdUsuario: Usuarios;
}
