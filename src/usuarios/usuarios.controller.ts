import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { Usuarios } from './entities/usuario.entity';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  async create(@Body() data: Partial<Usuarios>) {
    return await this.usuariosService.create(data);
  }
// Hola cosita hermosa 💕, paso por aquí para desearte la mejor suerte posible 🍀. Que hoy salga todo bien, porque si no estamos muertos 😅. Mentiraaa 🤭, pero ya eso sale el viernes o mañana en la noche ✨🙌.
  @Get()
  async findAll() {
    return await this.usuariosService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.usuariosService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Partial<Usuarios>,
  ) {
    return await this.usuariosService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.usuariosService.remove(id);
  }
}
