import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { BoletaService } from './boleta.service';

@Controller('boletas')
export class BoletaController {
  constructor(private readonly boletaService: BoletaService) {}

  @Post()
  create(@Body() data: {
    clienteId: number;
    detalles: {
      productoId: number;
      cantidad: number;
    }[];
  }) {
    return this.boletaService.create(data);
  }

  @Get()
  findAll() {
    return this.boletaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.boletaService.findOne(+id);
  }


}