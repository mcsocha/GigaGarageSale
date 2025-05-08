import { Component, Input, OnInit, inject, input } from '@angular/core';
import { GigaHttpClient } from '../shared/giga-http-client';
import { IProduct } from '../../../../shared/i-product';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shop',
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent implements OnInit {

  private gigaHttpClient: GigaHttpClient = inject(GigaHttpClient);

  products: IProduct[] = [];
  merchants: string[] = [];

  ngOnInit(): void {
    this.gigaHttpClient.getProducts().subscribe({
      next: (products: IProduct[]) => {
        this.products = products;
        this.merchants = this.products.map(p => p.merchant);
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      }
    });
  }
}
