import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Category, Product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProducts(): Promise<Product[]> {
    return this.http.get<Product[]>(`${environment.apiUrl}/products`).toPromise();
  }

  getProduct(id: number): Promise<Product> {
    return this.http.get<Product>(`${environment.apiUrl}/products/${id}`).toPromise();
  }

  deleteProduct(id: number): Promise<Product> {
    return this.http.delete<Product>(`${environment.apiUrl}/products/${id}`).toPromise();
  }

  postProduct(product: Product): Promise<Product> {
    return this.http.post<Product>(`${environment.apiUrl}/products`, product).toPromise();
  }

  putProduct(product: Product, id: number): Promise<Product> {
    return this.http.put<Product>(`${environment.apiUrl}/products/${id}`, product).toPromise();
  }

  getCategories(): Promise<Category[]> {
    return this.http.get<Category[]>(`${environment.apiUrl}/categories`).toPromise();
  }
}
