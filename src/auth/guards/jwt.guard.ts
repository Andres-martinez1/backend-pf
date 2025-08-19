import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.cookies?.token;

    if (!token) {
      throw new UnauthorizedException('Token no encontrado en cookies');
    }

    const secret = this.configService.get<string>('JWT_SECRET');
    if (!secret) {
      throw new Error('JWT_SECRET no está definido en .env');
    }

    try {
      const decoded = jwt.verify(token, secret);

      request['user'] = decoded;

      return true;
    } catch (error) {
      console.error('Token inválido:', error.message);
      throw new UnauthorizedException('Token inválido o expirado');
    }
  }
}
