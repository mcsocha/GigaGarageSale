import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from '../../../../shared/i-product';
import { GigaHttpClient } from '../shared/giga-http-client';
import { Params } from '@angular/router';

@Component({
  selector: 'app-product',
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  gigaHttpClient: GigaHttpClient = inject(GigaHttpClient);

  id: number = 0;
  title: string = '';
  name: string = '';
  descriptions: string[] = [];
  price: number = 0;
  imageUrl: string = '';
  available: number = 0;

  constructor() {
    this.activatedRoute.params.subscribe({
      next: (params: Params) => {
        let id = parseInt(params['id']);
        this.gigaHttpClient.getProduct(id).subscribe({
          next: (product: IProduct) => {
            this.setProduct(product);
          },
          error: (err) => {
            console.error(`Error fetching product id ${id}:`, err);
          }
        });
      }
    });
  }

  private setProduct(product: IProduct) {
    this.id = product.id;
    this.title = product.title;
    this.name = product.name;
    this.descriptions = product.descriptions;
    this.price = product.price;
    this.imageUrl = this.gigaHttpClient.hostUrl + product.image;
    this.available = product.available;
  }
}
