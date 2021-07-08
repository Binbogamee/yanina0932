import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category, Product } from 'src/app/shared/interfaces/product.interface';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  id: number | null = null;
  product: Product;
  products: Product[];
  categories: Category[];
  productForm!: FormGroup;

  constructor(private productService: ProductService,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.id = params.id ? +params.id : null;
    })
    this.getData();
    const controls = {
      name: [null, [Validators.required, Validators.maxLength(100)]],
      code: [null, [Validators.required, Validators.maxLength(100)]],
      price: [null, [Validators.required, Validators.min(1)]],
      manufacturer: [null, Validators.maxLength(100)],
      category: [null, Validators.required],
      weight: [null, [Validators.required, Validators.min(0.1)]],
      quantity: [null, [Validators.required, Validators.min(0)]],
    }

    this.productForm = this.fb.group(controls);
  }

  async getData() {
    try {
      this.products = (await this.productService.getProducts()) || [];
      this.categories = (await this.productService.getCategories()) || [];

      if (this.id) {
        this.product = await this.productService.getProduct(this.id);
        this.productForm.patchValue(this.product);
      } else {
        this.productForm.reset();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async onSaveProduct() {
    let product = this.productForm.value;
    if (this.id) {
      try {
        await this.productService.putProduct(product, this.id);
        this.router.navigate(['product']);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await this.productService.postProduct(product);
        this.router.navigate(['product']);
      } catch (error) {
        console.log(error);
      }
    }
  }

  async onDeleteProduct() {
    try {
      await this.productService.deleteProduct(this.id);
      this.router.navigate(['product']);
    } catch (error) {
      console.log(error);
    }
  }

}
