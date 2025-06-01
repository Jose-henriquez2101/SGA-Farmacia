import { Module } from '@nestjs/common';
import { InventarioItemService } from './inventario-item.service';
import { InventarioItemController } from './inventario-item.controller';

@Module({
  providers: [InventarioItemService],
  controllers: [InventarioItemController]
})
export class InventarioItemModule {}
