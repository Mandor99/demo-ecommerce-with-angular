import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


export interface IProduct{
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number,
    count: number
  };
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${environment.baseURLProducts}products`)
  }
  getAllCategories(): Observable<String[]> {
    return this.http.get<String[]>(`${environment.baseURLProducts}products/categories`)
  }
  getByCategory(category: String): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${environment.baseURLProducts}products/category/${category}`)
  }
  getProductById(id:String): Observable<IProduct> {
    return this.http.get<IProduct>(`${environment.baseURLProducts}products/${id}`)
  }
}
