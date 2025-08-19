import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { UsuarioFichaService } from './usuario_ficha.service';
import { UsuarioFicha } from './entities/usuario_ficha.entity';

@Controller('usuario_ficha')
export class UsuarioFichaController {
  constructor(private readonly usuarioFichaService: UsuarioFichaService) {}

  @Post()
  create(@Body() data: Partial<UsuarioFicha>) {
    return this.usuarioFichaService.create(data);
  }

  @Get()
  findAll() {
    return this.usuarioFichaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.usuarioFichaService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() data: Partial<UsuarioFicha>) {
    return this.usuarioFichaService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.usuarioFichaService.remove(+id);
  }
}
