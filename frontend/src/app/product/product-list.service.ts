import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../product'; 

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://ec2-13-218-198-226.compute-1.amazonaws.com/productos';
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
    return this.http.delete(`ec2-13-218-198-226.compute-1.amazonaws.com/productos/${id}`);
  }
}
