import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { InventarioService } from './inventario.service';

@Controller('inventario')
export class InventarioController {
  constructor(private readonly inventarioService: InventarioService) {}

  @Get()
  findAll() {
    return this.inventarioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.inventarioService.findOne(+id);
  }

  @Post()
  create(@Body() data: any) {
    return this.inventarioService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.inventarioService.update(+id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.inventarioService.delete(+id);
  }

  @Post('carga/barrido')
  cargaBarrido(@Body() data: any[]) {
    return this.inventarioService.cargaBarrido(data);
  }

  @Post('carga/selectiva')
  cargaSelectiva(@Body() data: any[]) {
    return this.inventarioService.cargaSelectiva(data);
  }

  @Post('carga/general')
  cargaGeneral(@Body() data: any[]) {
    return this.inventarioService.cargaGeneral(data);
  }
}