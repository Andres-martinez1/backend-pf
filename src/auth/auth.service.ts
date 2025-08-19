// src/auth/auth.service.ts

import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { JwtService } from '@nestjs/jwt';
import { Usuarios } from 'src/usuarios/entities/usuario.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuarioService: UsuariosService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<Usuarios> {
    const user = await this.usuarioService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Contraseña incorrecta');
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
        nombre: user.nombres,
        email: user.correo,
        rol: user.fkIdRol?.nombreRol,
      },
    };
  }
}
