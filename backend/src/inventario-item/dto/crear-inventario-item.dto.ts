import { IsInt, Min } from 'class-validator';

export class CrearInventarioItemDto {
  @IsInt()
  inventarioId: number;

  @IsInt()
  productoId: number;

  @IsInt()
  @Min(0)
  cantidad: number;
}