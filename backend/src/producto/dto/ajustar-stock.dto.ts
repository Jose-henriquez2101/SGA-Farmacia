import { IsInt, IsOptional } from 'class-validator';

export class AjustarStockDto {
  @IsOptional()
  @IsInt()
  nuevaCantidad?: number;

  @IsOptional()
  @IsInt()
  ajuste?: number;
}