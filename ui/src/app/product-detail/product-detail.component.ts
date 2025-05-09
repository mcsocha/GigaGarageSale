import { Component, Input, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { IProduct } from '../../../../shared/i-product';
import { Params } from '@angular/router';
import { ProductsService } from '../shared/products-service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StarRatingComponent } from '../star-rating/star-rating.component';

@Component({
  selector: 'app-product-detail',
  imports: [RouterModule, CurrencyPipe, FormsModule, CommonModule, StarRatingComponent],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent {

  activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  productSvc: ProductsService = inject(ProductsService);

  product: IProduct = null;

  constructor() {
    this.activatedRoute.params.subscribe({
      next: (params: Params) => {
        this.productSvc.products$
          .then(products => {
            let id = parseInt(params['id']);
            let curProduct = products.find(product => product.id === id);
            if (curProduct) {
              this.product = curProduct;
            } else {
              console.error(`Product with id ${id} not found`);
            }
          })
          .catch(error => {
            console.error('Error fetching products:', error);
          });
      },
      error: (error) => {
        console.error('Error fetching route params:', error);
      }
    });
  }
}
