import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct, ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {

  routeId: any=''
  product!: IProduct
  loading:boolean= true
  constructor(private route: ActivatedRoute, private productService: ProductsService) {
    this.routeId = route.snapshot.paramMap.get('id')
  }

  ngOnInit() {
    this.getSingleProduct()
  }
  
  getSingleProduct() {
    this.loading = true
    this.productService.getProductById(this.routeId).subscribe({
      next: res => {
        this.product = res
        this.loading=false
      },
      error: err => {
        this.loading = false
        alert(err.message)
      }
    })
  }

}
