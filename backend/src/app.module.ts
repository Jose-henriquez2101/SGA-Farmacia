import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ClienteModule } from './cliente/cliente.module';
import { ProductoModule } from './producto/producto.module';

@Module({
  imports: [UserModule, ClienteModule, ProductoModule]
})
export class AppModule {}
