import {
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Ficha } from "../../ficha/entities/ficha.entity";
import { Usuarios } from "../../usuarios/entities/usuario.entity";

@Entity("usuario_ficha", { schema: "public" })
export class UsuarioFicha {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @ManyToOne(() => Ficha, (ficha) => ficha.usuarioFichas)
  @JoinColumn([{ name: "fk_id_ficha", referencedColumnName: "idFicha" }])
  fkIdFicha: Ficha;

  @ManyToOne(() => Usuarios, (usuarios) => usuarios.usuarioFichas)
  @JoinColumn([{ name: "fk_id_usuario", referencedColumnName: "idUsuario" }])
  fkIdUsuario: Usuarios;
}
