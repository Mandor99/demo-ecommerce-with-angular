import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductsComponent} from './components/products/products.component'
import { CartComponent } from './components/cart/cart.component';

const routes: Routes = [
  {path:'', component: ProductsComponent, pathMatch: "full"},
  {path:'product/:id', component: ProductDetailsComponent, pathMatch: "full"},
  {path:'cart', component: CartComponent, pathMatch: "full"},
  {path:'**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
