import {
  Controller,
  Post,
  Body,
  Res,
  UnauthorizedException,
  Get,
  UseGuards,
  Req,
  HttpCode,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response, Request } from 'express';
import { JwtGuard } from './guards/jwt.guard';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );

    const tokenData = await this.authService.login(user);

    res.cookie('token', tokenData.access_token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: false, 
      maxAge: 1000 * 60 * 60 * 24, // 1 día
    });

    return {
      message: 'Login exitoso',
      user: tokenData.user,
    };
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('token');
    return { message: 'Sesión cerrada correctamente' };
  }

  @UseGuards(JwtGuard)
  @Get('me')
  getProfile(@Req() req: Request & { user: any }) {
    return req.user;
  }

  @Post('recuperar-password')
  @HttpCode(HttpStatus.OK)
  async recuperarPassword(@Body('email') email: string) {
    if (!email) {
      throw new BadRequestException('El correo electrónico es requerido.');
    }
    await this.authService.enviarCorreoRecuperacion(email);
    return {
      message:
        'Si tu correo electrónico está registrado, recibirás un código para restablecer tu contraseña.',
    };
  }

  @Post('restablecer-password')
  @HttpCode(HttpStatus.OK)
  async restablecerPassword(
    @Body()
    body: {
      email: string;
      codigo: string;
      nuevaPassword: string;
    },
  ) {
    const { email, codigo, nuevaPassword } = body;
    if (!email || !codigo || !nuevaPassword) {
      throw new BadRequestException('Faltan datos requeridos (email, codigo, nuevaPassword).');
    }

    await this.authService.verificarCodigoYActualizarPassword(
      email,
      codigo,
      nuevaPassword,
    );

    return {
      message: 'Contraseña actualizada correctamente.',
    };
  }
}