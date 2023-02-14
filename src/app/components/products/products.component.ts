import { Component } from '@angular/core';
import { IProduct, ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  categories:String[]= ['All']
  productsData:IProduct[]=[]
  loading:Boolean= true

  constructor(private products:ProductsService){}

  ngOnInit() {
    this.getProducts()
    this.getCategories()
  }

  getProducts():void {
    this.loading=true
    this.products.getAllProducts().subscribe({
      next: res => {
        this.productsData = res
        this.loading=false
      },
      error: err => {
        this.loading=false
        alert(err.message)
      }
    })
  }

  getCategories():void {
    this.loading=true
    this.products.getAllCategories().subscribe({
      next: res => {
        this.categories.push(...res)
        this.loading=false
      },
      error: err => {
        this.loading=false
        alert(err.message)
      }
    })
  }

  getCategory(val:any) {
    this.loading=true
    this.products.getByCategory(val.value).subscribe({
      next: res => {
        this.productsData = res
        this.loading=false
      },
      error: err => {
        this.loading=false
        alert(err.message)
      }
    })
  }

  filteredPros(val:any) {
    console.log(val.value)
    val.value !== 'All' ? this.getCategory(val) : this.getProducts()
  }
}
