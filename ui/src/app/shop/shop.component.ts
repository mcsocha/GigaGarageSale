import { Component, Input, OnInit, inject, input } from '@angular/core';
import { GigaHttpClient } from '../shared/giga-http-client';
import { IProduct } from '../../../../shared/i-product';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-shop',
  imports: [
    FormsModule,
    CommonModule,
    MatExpansionModule
  ],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent implements OnInit {

  private gigaHttpClient: GigaHttpClient = inject(GigaHttpClient);

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

  clearFilters() {
    this.merchantFilter = '';
    this.brandFilter = '';
    this.categoryFilter = '';
    this.filteredProducts = this.products;
  }

  ngOnInit(): void {
    this.gigaHttpClient.getProducts().subscribe({
      next: (products: IProduct[]) => {
        this.products = products;
        this.filteredProducts = products;

        // make distinct lists for filter
        this.merchants = [...new Set(this.products.map(p => p.merchant))];
        this.brands = [...new Set(this.products.map(p => p.brand))];
        this.categories = [...new Set(this.products.map(p => p.category))];
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      }
    });
  }
}
