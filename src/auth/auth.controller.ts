import {
  Controller,
  Post,
  Body,
  Res,
  UnauthorizedException,
  Get,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Response, Request } from 'express';
import { JwtGuard } from './guards/jwt.guard';

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

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const tokenData = await this.authService.login(user);

    res.cookie('token', tokenData.access_token, {
      httpOnly: true,           
      sameSite: 'lax',        
      secure: false,            
      maxAge: 1000 * 60 * 60 * 24, 
    });

    return {
      message: ' Login exitoso',
      user: tokenData.user,
    };
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('token'); 
    return { message: ' Sesión cerrada correctamente' };
  }

  @UseGuards(JwtGuard)
  @Get('me')
 getProfile(@Req() req: Request & { user: any }) {
  return req.user;
}

}
