import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class ProductoService {
  async create(data: {
    codigo: number;
    nombre: string;
    descripcion: string;
    precio: number;
    categoriaId: number;
    stock: number;
    stockmin: number;
  }) {
    const existing = await prisma.producto.findUnique({
      where: { codigo: data.codigo },
    });

    if (existing) {
      throw new ConflictException('Ya existe un producto con este código en el sistema');
    }

    const categoria = await prisma.categoria.findUnique({
      where: { id: data.categoriaId },
    });

    if (!categoria) {
      throw new NotFoundException('Categoría no encontrada');
    }

    return prisma.producto.create({
      data: {
        codigo: data.codigo,
        nombre: data.nombre,
        descripcion: data.descripcion,
        precio: data.precio,
        stock: data.stock,
        stockmin: data.stockmin,
        categoria: {
          connect: { id: data.categoriaId },
        },
      },
    });
  }

  async findAll() {
    return prisma.producto.findMany();
  }

  async findOne(codigo: number) {
    const producto = await prisma.producto.findUnique({ where: { codigo } });
    if (!producto) {
      throw new NotFoundException('No existe un producto con este código en el sistema');
    }
    return producto;
  }

  async update(
    codigo: number,
    data: Partial<{
      nombre: string;
      descripcion: string;
      precio: number;
      categoriaId: number;
      stock: number;
      stockmin: number;
    }>,
  ) {
    if (data.categoriaId) {
      const categoria = await prisma.categoria.findUnique({
        where: { id: data.categoriaId },
      });
      if (!categoria) {
        throw new NotFoundException('Categoría no encontrada');
      }
    }

    return prisma.producto.update({
      where: { codigo },
      data: {
        nombre: data.nombre,
        descripcion: data.descripcion,
        precio: data.precio,
        stock: data.stock,
        stockmin: data.stockmin,
        ...(data.categoriaId && {
          categoria: {
            connect: { id: data.categoriaId },
          },
        }),
      },
    });
  }

  async remove(codigo: number) {
    return prisma.producto.delete({ where: { codigo } });
  }
}
