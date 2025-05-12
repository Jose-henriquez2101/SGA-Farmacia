import { Controller, Get, Post, Body, Param, Delete, Put, Patch, Query } from '@nestjs/common'
import { ProductoService } from './producto.service';
import { AjustarStockDto } from './dto/ajustar-stock.dto';


@Controller('producto')
export class ProductoController {

    constructor(private readonly productoService: ProductoService) {}
      //CRUD------------------------------------------------------------------------------
      @Post()
      create(@Body() data: { nombre: string; categoria: string; cantidad: number }) {
        return this.productoService.create(data);
      }
    
      @Get()
      findAll() {
        return this.productoService.findAll();
      }
    
      @Get(':id')
      findOne(@Param('id') id: string) {
        return this.productoService.findOne(+id);
      }
    
      @Put(':id')
      update(@Param('id') id: string, @Body() data: {  nombre: string; categoria: string; cantidad: number }) {
    
        return this.productoService.update(+id, data);
      }
    

      
      @Delete(':id')
      remove(@Param('id') id: string) {
        return this.productoService.remove(+id);
      }

      //
    @Get('buscar')
      buscar(@Query('q') query: string) {
          return this.productoService.buscarProductos(query);
      }


    @Get(':id')
      obtener(@Param('id') id: string) {
            return this.productoService.obtenerProducto(Number(id));
      }   
    @Patch(':id/ajustar-stock')
      ajustarStock(@Param('id') id: string, @Body() dto: AjustarStockDto) {
            return this.productoService.ajustarStock(Number(id), dto);
    }


}
