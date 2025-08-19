import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { Usuarios } from './entities/usuario.entity';
import { User } from 'src/auth/decorators/user.decorator';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  create(@Body() data: Partial<Usuarios>) {
    return this.usuariosService.create(data);
  }

  @Get()
  findAll() {
    return this.usuariosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.usuariosService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() data: Partial<Usuarios>) {
    return this.usuariosService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.usuariosService.remove(+id);
  }

   @Get('perfil')
  getPerfil(@User() user: any) {
    return {
      message: 'Usuario autenticado',
      user,
    };
  }
}
