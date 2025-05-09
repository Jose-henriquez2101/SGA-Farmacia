import { Injectable, ConflictException} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class ProductoService {
  async create(data: { codigo: number; nombre: string; descripcion: string; precio: number; categoria: string; stock: number; stockmin: number}) {
    const existing = await prisma.producto.findUnique({
      where: { codigo: data.codigo },
    });

    if (existing) {
      throw new ConflictException('Ya existe un producto con este id en el sistema');
    }

    return prisma.producto.create({ data });
  }

  async findAll() {
    return prisma.producto.findMany();
  }

  async findOne(codigo: number) {
    const producto = await prisma.producto.findUnique({ where: { codigo } });
    if (!producto) {
      throw new ConflictException('No existe un producto con este id en el sistema');
    }
    return prisma.producto.findUnique({ where: { codigo } });
  }

  async update(codigo: number, data: { nombre?: string; descripcion?: string; precio?: number; categoria?: string; stock?: number; stockmin?: number }) {
    return prisma.producto.update({ where: { codigo }, data });
  }

  async remove(codigo: number) {
    return prisma.producto.delete({ where: { codigo } });
  }
}
