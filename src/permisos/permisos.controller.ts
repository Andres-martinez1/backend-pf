import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { PermisosService } from './permisos.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@UseGuards(JwtGuard)
@Controller('permisos')
export class PermisosController {
  constructor(private readonly permisosService: PermisosService) {}

  @Get()
  async findAll() {
    const result = await this.permisosService.findAll();
    return result;
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const result = await this.permisosService.findOne(id);
    return result;
  }

  @Post()
  async create(
    @Body('accesoVer') accesoVer: boolean,
    @Body('accesoCrear') accesoCrear: boolean,
    @Body('accesoEditar') accesoEditar: boolean,
    @Body('accesoEliminar') accesoEliminar: boolean,
    @Body('idOpcion', ParseIntPipe) idOpcion: number,
    @Body('idRol', ParseIntPipe) idRol: number,
  ) {
    const result = await this.permisosService.create(
      accesoVer,
      accesoCrear,
      accesoEditar,
      accesoEliminar,
      idOpcion,
      idRol,
    );
    return result;
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body('accesoVer') accesoVer?: boolean,
    @Body('accesoCrear') accesoCrear?: boolean,
    @Body('accesoEditar') accesoEditar?: boolean,
    @Body('accesoEliminar') accesoEliminar?: boolean,
    @Body('idOpcion', ParseIntPipe) idOpcion?: number,
    @Body('idRol', ParseIntPipe) idRol?: number,
  ) {
    const result = await this.permisosService.update(
      id,
      accesoVer,
      accesoCrear,
      accesoEditar,
      accesoEliminar,
      idOpcion,
      idRol,
    );
    return result;
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const result = await this.permisosService.remove(id);
    return result;
  }
}
