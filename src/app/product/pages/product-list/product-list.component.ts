import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category, Product } from 'src/app/shared/interfaces/product.interface';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products!: Product[];
  categories!: Category[];
  filterCategory: string;
  filterPresence: string;
  filterArray: Product[];
  sortPrice = true;
  sortQuantity = true;

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.getData();
  }


  async getData() {
    try {
      this.products = (await this.productService.getProducts()) || [];
      this.categories = (await this.productService.getCategories()) || [];
      this.filterArray = this.products;
    } catch (error) {
      console.log(error);
    }
  }

  linkToItem(id?: number) {
    if (id) {
      this.router.navigate([this.router.url, 'item', id]);
    } else {
      this.router.navigate([this.router.url, 'item']);
    }
  }

  onFilter() {
    this.filterArray = this.products;
    if (this.filterCategory == "all" || this.filterCategory == null) {
      if (this.filterPresence == "presence") {
        this.filterArray = this.products.filter(product => product.quantity > 0);
      } else {
        this.filterArray = this.products;
      }
    } else {
      if (this.filterPresence == "presence") {
        this.filterArray = this.products.filter(product => product.category == this.filterCategory && product.quantity > 0)
      } else {
        this.filterArray = this.products.filter(product => product.category == this.filterCategory);
      }
    }
  }

  onSortPrice() {
    if (this.sortPrice) {
      this.filterArray.sort(function (a, b) {
        if (a.price > b.price) {
          return 1;
        } else {
          return 0;
        }
      })
    } else {
      this.filterArray.sort(function (a, b) {
        if (a.price < b.price) {
          return 1;
        } else {
          return 0;
        }
      })
    }
    this.sortPrice = !this.sortPrice;
  }

  onSortQuantity() {
    if (this.sortQuantity) {
      this.filterArray.sort(function (a, b) {
        if (a.quantity > b.quantity) {
          return 1;
        } else {
          return 0;
        }
      })
    } else {
      this.filterArray.sort(function (a, b) {
        if (a.quantity < b.quantity) {
          return 1;
        } else {
          return 0;
        }
      })
    }
    this.sortQuantity = !this.sortQuantity;
  }

  async onMinusQuantity(id: number) {
    try {
      let idx = this.products.findIndex(elm => elm.id == id);
      if (this.products[idx].quantity > 0) {
        this.products[idx].quantity--;
        await this.productService.putProduct(this.products[idx], id);
        this.getData();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async onPlusQuantity(id: number) {
    try {
      let idx = this.products.findIndex(elm => elm.id == id);
      this.products[idx].quantity++;
      await this.productService.putProduct(this.products[idx], id);
      this.getData();
    } catch (error) {
      console.log(error);
    }
  }
}
