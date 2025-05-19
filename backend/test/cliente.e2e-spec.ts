// test/cliente.e2e-spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest'; 
import { ClienteModule } from '../src/cliente/cliente.module';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

describe('ClienteController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ClienteModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await prisma.cliente.deleteMany(); // limpia los datos
    await app.close();
    await prisma.$disconnect();
  });

  it('POST /clientes → debería crear un cliente', async () => {
    const cliente = {
      nombre: 'Juan Pérez',
      rut: '12345678-9',
      direccion: 'Av. Siempre Viva 123',
      telefono: '987654321',
    };

    const response = await request(app.getHttpServer())
      .post('/clientes')
      .send(cliente)
      .expect(201);

    expect(response.body).toMatchObject(cliente);
  });
});
