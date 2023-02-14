import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface ICart{
    userId:number,
    date:Date,
    products:{productId:number,quantity:number}[]|undefined

}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) {}

   postCart(model:ICart): Observable<ICart>{
    return this.http.post<ICart>(`${environment.baseURLProducts}carts`, model)
  }
}
