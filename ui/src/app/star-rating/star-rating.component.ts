import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild, inject } from '@angular/core';
import { IProduct } from '../../../../shared/i-product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-star-rating',
  imports: [CommonModule],
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.scss'
})
export class StarRatingComponent {

  _product: IProduct = {} as IProduct;
  get product(): IProduct {
    return this._product;
  }
  @Input()
  set product(value: IProduct) {
    this._product = value;
  }
}
