import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CrearInventarioDto } from '../inventario/dto/crear-inventario.dto';
import { CrearInventarioItemDto } from './dto/crear-inventario-item.dto';



const prisma = new PrismaClient();

@Injectable()
export class InventarioItemService {


  async crear(dto: CrearInventarioItemDto) {
    return prisma.inventarioItem.create({
      data: {
        inventarioId: dto.inventarioId,
        productoId: dto.productoId,
        cantidad: dto.cantidad,
      },
    });
  }

  async listarPorInventario(inventarioId: number) {
    return prisma.InventarioItem.findMany({
      where: { inventarioId },
      include: { producto: true },
    });
  }
}