import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { JwtService } from '@nestjs/jwt';
import { Usuarios } from 'src/usuarios/entities/usuario.entity';
import { MailerService } from '@nestjs-modules/mailer'; 
import { randomInt } from 'crypto'; 

@Injectable()
export class AuthService {
 
  private codigosVerificacion = new Map<
    string,
    { codigo: string; expira: Date }
  >();

  constructor(
    private readonly usuarioService: UsuariosService,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService, 
  ) {}

  async validateUser(correo: string, password: string): Promise<Usuarios> {
    const user = await this.usuarioService.findByEmail(correo);
    if (!user) {
      throw new UnauthorizedException('Usuario o contraseña incorrectos');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Usuario o contraseña incorrectos');
    }
    return user;
  }

  async login(user: Usuarios) {
    const payload = {
      id: user.idUsuario,
      nombre: user.nombres,
      email: user.correo,
      rol: {
        id: user.fkIdRol?.idRol,
        nombre: user.fkIdRol?.nombreRol,
      },
    };

    const accessToken = await this.jwtService.signAsync(payload);

    return {
      access_token: accessToken,
      user: {
        id: user.idUsuario,
        nombre: `${user.nombres} ${user.apellidos}`,
        email: user.correo,
        rol: user.fkIdRol?.nombreRol || null,
      },
    };
  }

  async enviarCorreoRecuperacion(email: string): Promise<boolean> {
    const usuario = await this.usuarioService.findByEmail(email);

    if (!usuario) {
      return false;
    }

    const codigo = randomInt(100000, 999999).toString();
    const expiracion = new Date();
    expiracion.setMinutes(expiracion.getMinutes() + 15); 

    this.codigosVerificacion.set(email, { codigo, expira: expiracion });

    try {
      await this.mailerService.sendMail({
        to: usuario.correo,
        subject: 'Código de Recuperación de Contraseña',
        html: `
          <h1>Recuperación de Contraseña</h1>
          <p>Hola ${usuario.nombres},</p>
          <p>Has solicitado restablecer tu contraseña. Usa el siguiente código para continuar:</p>
          <h2 style="text-align: center; letter-spacing: 2px;"><b>${codigo}</b></h2>
          <p>Este código es válido por 15 minutos.</p>
          <p>Si no solicitaste este cambio, por favor ignora este mensaje.</p>
        `,
      });
      return true;
    } catch (error) {
      console.error('Error al enviar el correo de recuperación:', error);
      return false; 
    }
  }

  async verificarCodigoYActualizarPassword(
    email: string,
    codigo: string,
    nuevaPassword: string,
  ): Promise<void> {
    const dataGuardada = this.codigosVerificacion.get(email);

    if (!dataGuardada) {
      throw new BadRequestException('Código de verificación no solicitado o ya utilizado.');
    }

    if (new Date() > dataGuardada.expira) {
      this.codigosVerificacion.delete(email); 
      throw new BadRequestException('El código de verificación ha expirado.');
    }

    if (dataGuardada.codigo !== codigo) {
      throw new BadRequestException('El código de verificación es incorrecto.');
    }

    const usuario = await this.usuarioService.findByEmail(email);
    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado.');
    }

    if (!nuevaPassword || nuevaPassword.length < 6) {
      throw new BadRequestException(
        'La nueva contraseña debe tener al menos 6 caracteres.',
      );
    }
  
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(nuevaPassword, salt);


    await this.usuarioService.updatePassword(usuario.idUsuario, hashedPassword);
    this.codigosVerificacion.delete(email);
  }
}