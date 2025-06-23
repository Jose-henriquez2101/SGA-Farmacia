import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../product'; 

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://ec2-44-204-161-5.compute-1.amazonaws.com/productos';
  filteredProducts: Product[] = [];
  public products: Product[]= [];

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  deleteProduct(id: number) {
    return this.http.delete(`http://ec2-44-204-161-5.compute-1.amazonaws.com/productos/${id}`);
  }
}
