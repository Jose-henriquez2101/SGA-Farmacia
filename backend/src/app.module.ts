import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ClienteModule } from './cliente/cliente.module';
import { InventarioService } from './inventario/inventario.service';
import { InventarioController } from './inventario/inventario.controller';
import { InventarioModule } from './inventario/inventario.module';
import { InventarioitemModule } from './inventarioitem/inventarioitem.module';
import { InventarioItemModule } from './inventario-item/inventario-item.module';

@Module({
  imports: [UserModule, ClienteModule, InventarioModule, InventarioitemModule, InventarioItemModule],
  providers: [InventarioService],
  controllers: [InventarioController],
})
export class AppModule {}
