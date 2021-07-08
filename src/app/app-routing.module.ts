import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
  },
  {
    path: 'product',
    loadChildren: () => import('./product/product.module').then((mod) => mod.ProductModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
