import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductlistComponent } from './components/productlist/productlist.component';

const routes: Routes = [
  {path: 'product', component: ProductlistComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }