import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class CategoriaService {
  async create(data: { nombre: string }) {
    const existente = await prisma.categoria.findFirst({
      where: { nombre: data.nombre },
    });

    if (existente) {
      throw new ConflictException('La categoría ya existe');
    }

    return prisma.categoria.create({ data });
  }

  findAll() {
    return prisma.categoria.findMany();
  }

  findOne(id: number) {
    return prisma.categoria.findUnique({ where: { id } });
  }

  async update(id: number, data: Partial<{ nombre: string }>) {
    const existente = await prisma.categoria.findUnique({ where: { id } });

    if (!existente) {
      throw new NotFoundException('Categoría no encontrada');
    }

    return prisma.categoria.update({ where: { id }, data });
  }

  async remove(id: number) {
    const existente = await prisma.categoria.findUnique({ where: { id } });

    if (!existente) {
      throw new NotFoundException('Categoría no encontrada');
    }

    return prisma.categoria.delete({ where: { id } });
  }
}
