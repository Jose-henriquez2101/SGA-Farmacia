import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class ClienteService {
  async create(data: { nombre: string; rut: string; direccion: string; telefono: string }) {
    const existing = await prisma.cliente.findUnique({
      where: { rut: data.rut },
    });

    if (existing) {
      throw new ConflictException('El RUT ya existe en el sistema');
    }

    return prisma.cliente.create({ data });
  }

  findAll() {
    return prisma.cliente.findMany();
  }

  findOne(id: number) {
    return prisma.cliente.findUnique({ where: { id } });
  }

  update(id: number, data: Partial<{ nombre: string; rut: string; direccion: string; telefono: string }>) {
    return prisma.cliente.update({ where: { id }, data });
  }

  remove(id: number) {
    return prisma.cliente.delete({ where: { id } });
  }
}
