


export class CrearInventarioDto {
  tipo!: 'GENERAL' | 'SELECTIVO' | 'BARRIDO';
  items!: {
    productoId: number;
    cantidad: number;
  }[];
}