import { Controller } from '@nestjs/common';
import { InventarioService } from './inventario.service';
import { Post, Body } from '@nestjs/common';
import { CrearInventarioDto } from './dto/crear-inventario.dto';

@Controller('inventario')
export class InventarioController {

    constructor(private readonly inventarioService: InventarioService) {}


    @Post()
    async aplicarInventario(@Body() dto: CrearInventarioDto) {
    return this.inventarioService.aplicarInventario(dto);
    }

}
