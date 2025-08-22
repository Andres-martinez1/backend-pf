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
import { ProgramasService } from './programas.service';
import { Programas } from './entities/programas.entity';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@UseGuards(JwtGuard)
@Controller('programas')
export class ProgramasController {
  constructor(private readonly programasService: ProgramasService) {}

  @Get()
  async findAll(): Promise<Programas[]> {
    return await this.programasService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Programas> {
    return await this.programasService.findOne(id);
  }

  @Post()
  async create(@Body() data: Partial<Programas>): Promise<{ message: string; data: Programas }> {
    return await this.programasService.create(data);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Partial<Programas>,
  ): Promise<{ message: string; data: Programas }> {
    return await this.programasService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    return await this.programasService.remove(id);
  }
}
