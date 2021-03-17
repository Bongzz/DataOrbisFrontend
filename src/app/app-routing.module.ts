import { LayoutContainerComponent } from './components/layout-container/layout-container.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductlistComponent } from './components/productlist/productlist.component';
//{path: '#', component: LayoutContainerComponent},
const routes: Routes = [
  {path: 'product-list', component: ProductlistComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }