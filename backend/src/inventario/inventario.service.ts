import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CrearInventarioDto } from './dto/crear-inventario.dto';


const prisma = new PrismaClient();

@Injectable()
export class InventarioService {

    async aplicarInventario(inventarioDto: CrearInventarioDto) {
    const { tipo, items } = inventarioDto;

    if (tipo === 'GENERAL') {
        // Resetea todos los productos a 0 antes de aplicar el nuevo stock
        await prisma.producto.updateMany({ data: { cantidad: 0 } });
    }

    const productosActualizados = [];

    for (const item of items) {
        const producto = await prisma.producto.findUnique({ where: { id: item.productoId } });

        if (!producto) continue;

        let nuevoStock = item.cantidad;

        if (tipo === 'SELECTIVO') {
        nuevoStock = item.cantidad;
        } else if (tipo === 'BARRIDO') {
        // Solo se actualizan productos presentes; los ausentes mantienen o se ponen en 0 externamente
        nuevoStock = item.cantidad;
        }

        const actualizado = await prisma.producto.update({
        where: { id: item.productoId },
        data: { cantidad: nuevoStock },
        });

        productosActualizados.push(actualizado);
    }

    return productosActualizados;
    }

}
