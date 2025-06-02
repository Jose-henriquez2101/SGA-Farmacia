import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

@Injectable()
export class InventarioService {
  constructor() {}

  // CRUD
  findAll() {
    return prisma.inventario.findMany();
  }

  findOne(id: number) {
    return prisma.inventario.findUnique({ where: { id } });
  }

  create(data: any) {
    return prisma.inventario.create({ data });
  }

  update(id: number, data: any) {
    return prisma.inventario.update({ where: { id }, data });
  }

  delete(id: number) {
    return prisma.inventario.delete({ where: { id } });
  }

  // Carga Barrido: añade registros sin borrar los anteriores
  async cargaBarrido(items: any[]) {
    const operaciones = items.map(item =>
      prisma.inventario.create({ data: item })
    );
    return prisma.$transaction(operaciones);
  }

  // Carga Selectiva: actualiza si existe, crea si no
  async cargaSelectiva(items: any[]) {
    const operaciones = items.map(item =>
      prisma.inventario.upsert({
        where: { id: item.id || 0 },
        create: item,
        update: item,
      }),
    );
    return prisma.$transaction(operaciones);
  }

  // Carga General: borra todo y vuelve a cargar
  async cargaGeneral(items: any[]) {
    await prisma.inventario.deleteMany();
    return prisma.inventario.createMany({ data: items });
  }
}
