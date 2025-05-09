import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IProduct } from '../../../../shared/i-product';

@Component({
  selector: 'app-product',
  imports: [RouterModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {

  _product: IProduct;
  get product(): IProduct {
    return this._product;
  }
  @Input()
  set product(value: IProduct) {
    this._product = value;
  }
}
