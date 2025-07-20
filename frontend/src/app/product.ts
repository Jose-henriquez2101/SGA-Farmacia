export interface Product {
  codigo?: string;
  nombre: string;
  descripcion: string;
  precio: number;
  image: string;
  stock: number;
  stockmin: number;
  categoriaId: number;
}
