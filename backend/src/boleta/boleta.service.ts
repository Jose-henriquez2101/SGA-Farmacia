import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class BoletaService {
  async create(data: {
    clienteId: number;
    detalles: {
      productoId: number;
      cantidad: number;
    }[];
  }) {
    const cliente = await prisma.cliente.findUnique({ where: { id: data.clienteId } });
    if (!cliente) throw new NotFoundException('Cliente no encontrado');

    let total = 0;
    const detallesData = await Promise.all(
      data.detalles.map(async (item) => {
        const producto = await prisma.producto.findUnique({ where: { codigo: item.productoId } });
        if (!producto) throw new NotFoundException(`Producto ${item.productoId} no encontrado`);

        if (producto.stock < item.cantidad) {
          throw new BadRequestException(`Stock insuficiente para producto ${producto.nombre}`);
        }

        const subtotal = producto.precio * item.cantidad;
        total += subtotal;

        return {
          productoId: item.productoId,
          cantidad: item.cantidad,
          subtotal,
        };
      })
    );

    const boleta = await prisma.boleta.create({
      data: {
        clienteId: data.clienteId,
        total,
        detalles: {
          create: detallesData,
        },
      },
      include: {
        detalles: true,
      },
    });

    // Actualizar stock
    for (const item of data.detalles) {
      await prisma.producto.update({
        where: { codigo: item.productoId },
        data: { stock: { decrement: item.cantidad } },
      });
    }

    return boleta;
  }




  async findAll() {
    return prisma.boleta.findMany({
      include: {
        cliente: true,
        detalles: {
          include: {
            producto: true,
          },
        },
      },
    });
  }

  async findOne(id: number) {
    const boleta = await prisma.boleta.findUnique({
      where: { id },
      include: {
        cliente: true,
        detalles: {
          include: {
            producto: true,
          },
        },
      },
    });

    if (!boleta) throw new NotFoundException('Boleta no encontrada');
    return boleta;
  }
}