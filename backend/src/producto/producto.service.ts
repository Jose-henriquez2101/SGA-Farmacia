import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { AjustarStockDto } from './dto/ajustar-stock.dto';

const prisma = new PrismaClient();

@Injectable()
export class ProductoService {

  //CRUD------------------------------------------------------------------------------

    async create(data: { nombre: string; categoria: string; cantidad: number  }) {
    return prisma.producto.create({ data });
  }

  async findAll() {
    return prisma.producto.findMany();
  }

  async findOne(id: number) {
    return prisma.producto.findUnique({ where: { id } });
  }

  async update(id: number, data: {nombre: string; categoria: string; cantidad: number  }) {
    return prisma.producto.update({ where: { id }, data });
  }

  async remove(id: number) {
    return prisma.producto.delete({ where: { id } });
  }


//BUSQUEDA------------------------------------------------------------------------------
  async buscarProductos(query: string) {
  return prisma.producto.findMany({
    where: {
      OR: [
        { nombre: { contains: query } },
        { categoria: { contains: query } },
        { id: isNaN(Number(query)) ? undefined : Number(query) },
      ],
    },
  });
}

    async obtenerProducto(id: number) {
    return prisma.producto.findUnique({
        where: { id },
        select: { id: true, nombre: true, cantidad: true, categoria: true },
    });
    }

    async ajustarStock(id: number, dto: AjustarStockDto) {
  const producto = await prisma.producto.findUnique({ where: { id } });
  if (!producto) throw new Error('Producto no encontrado');

  const nuevaCantidad = dto.nuevaCantidad !== undefined
    ? dto.nuevaCantidad
    : producto.cantidad  = (dto.ajuste ?? 0);

  return prisma.producto.update({
    where: { id },
    data: { cantidad: nuevaCantidad },
  });
}

    


}
