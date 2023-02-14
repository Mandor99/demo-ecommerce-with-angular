import { Component, Input } from '@angular/core';
import { IProduct } from 'src/app/services/products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {

  @Input() singleProduct!: IProduct
  isAdd:boolean=false
  amountVal:number = 0
  cartProducts:any[] =[]

  addToCart(){
    this.isAdd = false
    if('cart' in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem('cart')!)
      const exist = this.cartProducts.find(({item}) =>item.id === this.singleProduct.id)
      if(exist)  {
        const updatedCart = this.cartProducts.map((prod) => {
          if(prod.item.id === this.singleProduct.id) {
            return {item: prod.item, quantity: prod.quantity + this.amountVal}
          } else {
            return prod
          }
        })
        this.cartProducts = updatedCart
        localStorage.setItem('cart', JSON.stringify(this.cartProducts))
       } else {
        this.cartProducts.push({item: this.singleProduct, quantity: this.amountVal})
        localStorage.setItem('cart', JSON.stringify(this.cartProducts))
       }
     
    } else {
      this.cartProducts.push({item: this.singleProduct, quantity: this.amountVal})
      localStorage.setItem('cart', JSON.stringify(this.cartProducts))
    }
    console.log(this.cartProducts)
  }
}
