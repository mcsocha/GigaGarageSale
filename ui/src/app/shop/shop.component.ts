import { Component, OnInit, inject } from '@angular/core';
import { IProduct } from '../../../../shared/i-product';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { ProductsService } from '../shared/products-service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-shop',
  imports: [
    FormsModule,
    CommonModule,
    MatExpansionModule,
    RouterModule
  ],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent {

  private productSvc: ProductsService = inject(ProductsService);

  products: IProduct[] = [];
  filteredProducts: IProduct[] = [];
  merchants: string[] = [];
  brands: string[] = [];
  categories: string[] = [];


  private _merchantFilter: string = '';
  get merchantFilter(): string {
    return this._merchantFilter;
  }
  set merchantFilter(value: string) {
    this._merchantFilter = value;
    this.filteredProducts = this.products.filter(product => product.merchant.toLowerCase() === value.toLowerCase());
    console.log(`Merchant filter: ${this.merchantFilter}`);
  }

  private _brandFilter: string = '';
  get brandFilter(): string {
    return this._brandFilter;
  }
  set brandFilter(value: string) {
    this._brandFilter = value;
    this.filteredProducts = this.products.filter(product => product.brand.toLowerCase() === value.toLowerCase());
    console.log(`Brand filter: ${this.brandFilter}`);
  }

  private _categoryFilter: string = '';
  get categoryFilter(): string {
    return this._categoryFilter;
  }
  set categoryFilter(value: string) {
    this._categoryFilter = value;
    this.filteredProducts = this.products.filter(product => product.category.toLowerCase() === value.toLowerCase());
    console.log(`Category filter: ${this.categoryFilter}`);
  }

  constructor() {
    this.productSvc.products$.then(products => {
      this.products = products;
      this.filteredProducts = products;

      // make distinct lists for filter
      this.merchants = [...new Set(this.products.map(p => p.merchant))];
      this.brands = [...new Set(this.products.map(p => p.brand))];
      this.categories = [...new Set(this.products.map(p => p.category))];
    }).catch(error => {
      console.error('Error fetching products:', error);
    });
  }

  clearFilters() {
    this.merchantFilter = '';
    this.brandFilter = '';
    this.categoryFilter = '';
    this.filteredProducts = this.products;
  }
}
