import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class AjustarStockDto {
  @IsOptional()
  @IsInt()
  @Min(0)
  nuevaCantidad?: number;

  @IsOptional()
  @IsInt()
  ajuste?: number;
}