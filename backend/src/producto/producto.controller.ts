import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ProductoService } from './producto.service';

@Controller('productos')
export class ProductoController {
  constructor(private readonly productoService: ProductoService) {}

  @Post()
  create(@Body() data: {
    codigo: number;
    nombre: string;
    descripcion: string;
    precio: number;
    categoriaId: number;
    stock: number;
    stockmin: number;
  }) {
    return this.productoService.create(data);
  }

  @Get()
  findAll() {
    return this.productoService.findAll();
  }

  @Get(':codigo')
  findOne(@Param('codigo') codigo: string) {
    return this.productoService.findOne(+codigo);
  }

  @Put(':codigo')
  update(
    @Param('codigo') codigo: string,
    @Body() data: Partial<{
      nombre: string;
      descripcion: string;
      precio: number;
      categoriaId: number;
      stock: number;
      stockmin: number;
    }>,
  ) {
    return this.productoService.update(+codigo, data);
  }

  @Delete(':codigo')
  remove(@Param('codigo') codigo: string) {
    return this.productoService.remove(+codigo);
  }
}
