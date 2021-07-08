import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ProductItemComponent } from './pages/product-item/product-item.component';
import { ProductLayoutComponent } from './shared/product-layout/product-layout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ProductListComponent,
    ProductItemComponent,
    ProductLayoutComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ProductModule { }
