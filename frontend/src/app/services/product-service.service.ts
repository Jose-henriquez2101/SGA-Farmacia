import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  constructor(private http: HttpClient) {}

  createProduct(product: any) {
    return this.http.post('http://ec2-3-87-48-145.compute-1.amazonaws.com/productos', product);
  }

  updateProduct(id: number, product: any) {
    return this.http.put(`http://ec2-3-87-48-145.compute-1.amazonaws.com/productos/${id}`, product);
  }

  deleteProduct(id: number) {
    return this.http.delete(`http://ec2-3-87-48-145.compute-1.amazonaws.com/productos/${id}`);
  }
}
