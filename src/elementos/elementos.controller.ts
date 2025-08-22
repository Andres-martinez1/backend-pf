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
import { ElementosService } from './elementos.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@UseGuards(JwtGuard)
@Controller('elementos')
export class ElementosController {
  constructor(private readonly elementosService: ElementosService) {}

  @Post()
  async create(
    @Body('nombreElemento') nombreElemento: string,
    @Body('clasificacion') clasificacion?: string,
    @Body('numeroDeSerie') numeroDeSerie?: string,
    @Body('uso') uso?: string,
    @Body('estado') estado?: string,
    @Body('tipo') tipo?: string,
    @Body('marca') marca?: string,
    @Body('img') img?: string,
    @Body('unidadDeMedida') unidadDeMedida?: string,
    @Body('descripcion') descripcion?: string,
    @Body('fechaVencimiento') fechaVencimiento?: string,
  ) {
    const elemento = await this.elementosService.create(
      nombreElemento,
      clasificacion,
      numeroDeSerie,
      uso,
      estado,
      tipo,
      marca,
      img,
      unidadDeMedida,
      descripcion,
      fechaVencimiento,
    );

    return {
      message: 'Elemento creado exitosamente',
      data: elemento,
    };
  }

  @Get()
  async findAll() {
    const elementos = await this.elementosService.findAll();
    return {
      message: 'Listado de elementos',
      data: elementos,
    };
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const elemento = await this.elementosService.findOne(id);
    return {
      message: 'Elemento encontrado',
      data: elemento,
    };
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body('nombreElemento') nombreElemento?: string,
    @Body('clasificacion') clasificacion?: string,
    @Body('numeroDeSerie') numeroDeSerie?: string,
    @Body('uso') uso?: string,
    @Body('estado') estado?: string,
    @Body('tipo') tipo?: string,
    @Body('marca') marca?: string,
    @Body('img') img?: string,
    @Body('unidadDeMedida') unidadDeMedida?: string,
    @Body('descripcion') descripcion?: string,
    @Body('fechaVencimiento') fechaVencimiento?: string,
  ) {
    const elemento = await this.elementosService.update(
      id,
      nombreElemento,
      clasificacion,
      numeroDeSerie,
      uso,
      estado,
      tipo,
      marca,
      img,
      unidadDeMedida,
      descripcion,
      fechaVencimiento,
    );

    return {
      message: 'Elemento actualizado exitosamente',
      data: elemento,
    };
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.elementosService.remove(id);
    return {
      message: 'Elemento eliminado exitosamente',
    };
  }
}
