import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ClienteModule } from './cliente/cliente.module';
import { ProductoModule } from './producto/producto.module';
import { PrometheusModule } from "@willsoto/nestjs-prometheus";

@Module({
  imports: [UserModule, ClienteModule, ProductoModule, PrometheusModule.register()]
})
export class AppModule {}
