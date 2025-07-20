export interface Product {
  codigo?: number;
  nombre: string;
  descripcion: string;
  precio: number;
  image: string;
  stock: number;
  stockmin: number;
  categoriaId: number;
}
