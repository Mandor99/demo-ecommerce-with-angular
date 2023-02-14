import { Component, ViewChild } from '@angular/core';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import { CartService, ICart } from 'src/app/services/cart.service';
import { IProduct } from 'src/app/services/products.service';

export interface UserData {
  item: IProduct,
  quantity: number
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  
  @ViewChild(MatTable) table!: MatTable<UserData>;
  displayedColumns: string[] = ['image', 'name', 'price', 'quantity', 'total', 'action'];
  cart!: MatTableDataSource<UserData> | null

  constructor(private cartService: CartService) {}
  ngOnInit() {
    this.getCart()
  }
  getCart() {
    if("cart" in localStorage) {
      this.cart=new MatTableDataSource(JSON.parse(localStorage.getItem('cart')!))
      // console.log(this.cart)
    } else {
      this.cart = null
    }
  }
  clgFn(ele:any) {console.log(ele)}
  getTotal(): number|undefined {
    if(this.cart !=null) {
      return +(this.cart?.data.reduce((sum, ele) => ele.item.price*ele.quantity+sum, 0)).toFixed(2)
    } else{
      return undefined
    }
  }

  clearCart() {
    if(this.cart!=null) {
      this.cart.data = []
      localStorage.removeItem('cart')
    }
    this.cart=null
  }

  deleteProduct(idx:any) {
    this.cart?.data.splice(idx, 1)
    localStorage.setItem('cart', JSON.stringify(this.cart?.data))
    this.cart=new MatTableDataSource(JSON.parse(localStorage.getItem('cart')!))
    if(this.cart.data.length ==0) {this.cart=null}
  }

  getLength() {
    if(this.cart!=null) {return this.cart?.data.length
    } else{return undefined}
  }
  getQty(eve:any, idx:any) {
    // console.log(eve.value)
    if(eve.value<1 || eve.value=='' || eve.value==null){eve.value=1}
    if(eve.value>=1) {
      let newCart = this.cart?.data.map((pro, i) => {
        const {item, quantity} = pro
        if(i==idx){
          return {item: item, quantity: eve.value}
        } else{
          return pro
        }
      })
      localStorage.setItem('cart', JSON.stringify(newCart))
      this.getProTotal(idx)
    }
  }

  getProTotal(idx:number) {
    // console.log(this.cart?.data[idx].quantity)
    let temp:any;
    if(this.cart!==null && this.cart.data[idx].quantity <=1) { temp= 1 }
    else {temp= this.cart?.data[idx].quantity}
    return temp
  }
  orderCart() {
    let cartProducts = this.cart?.data.map(({item, quantity}, i) => {
      return {productId:item.id,quantity}
    })
    // console.log('ccc', cartProducts)
    let modal: ICart =  {
      userId:5,
      date: new Date,
      products:cartProducts
  }
    this.cartService.postCart(modal).subscribe(res => console.log(res))
  }
  
}
