import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { UsuarioBodegaService } from './usuario_bodega.service';
import { UsuarioBodega } from './entities/usuario_bodega.entity';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@UseGuards(JwtGuard)
@Controller('usuario_bodega')
export class UsuarioBodegaController {
  constructor(private readonly usuarioBodegaService: UsuarioBodegaService) {}

  @Post()
  create(@Body() data: Partial<UsuarioBodega>) {
    return this.usuarioBodegaService.create(data);
  }

  @Get()
  findAll() {
    return this.usuarioBodegaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.usuarioBodegaService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() data: Partial<UsuarioBodega>) {
    return this.usuarioBodegaService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.usuarioBodegaService.remove(+id);
  }
}
