import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { Roles } from './entities/roles.entity';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  async findAll(): Promise<{ message: string; data: Roles[] }> {
    return await this.rolesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<{ message: string; data: Roles }> {
    return await this.rolesService.findOne(id);
  }

  @Post()
  async create(@Body('nombreRol') nombreRol: string): Promise<{ message: string; data: Roles }> {
    return await this.rolesService.create(nombreRol);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body('nombreRol') nombreRol: string,
  ): Promise<{ message: string; data: Roles }> {
    return await this.rolesService.update(id, nombreRol);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    return await this.rolesService.remove(id);
  }
}
