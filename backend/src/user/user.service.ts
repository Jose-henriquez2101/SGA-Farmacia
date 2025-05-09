import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class UserService {
  async create(data: { name: string; email: string }) {
    return prisma.user.create({ data });
  }

  async findAll() {
    return prisma.user.findMany();
  }

  async findOne(id: number) {
    return prisma.user.findUnique({ where: { id } });
  }

  async update(id: number, data: { name?: string; email?: string }) {
    return prisma.user.update({ where: { id }, data });
  }

  async remove(id: number) {
    return prisma.user.delete({ where: { id } });
  }
}
