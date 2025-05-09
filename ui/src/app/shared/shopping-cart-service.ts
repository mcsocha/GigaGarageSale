import { Injectable, inject } from "@angular/core";
import { IProduct } from "../../../../shared/i-product";
import { IShoppingCartItem } from "./i-shopping-cart-item";

/**
 * Singleton service storing the products added to cart for the session
 */
@Injectable({ providedIn: 'root' })
export class ShoppingCartService {

  private _cartItems: IShoppingCartItem[] = [];
  get cartItems() : IShoppingCartItem[] {
    return this._cartItems
  }

  numItems: number = 0;
  total: number = 0;

  addItem(product: IProduct): void {
    let item = this._cartItems.find(ci => ci.product.id === product.id);
    if(item) {
      item.quantity++;
    } else {
      this._cartItems.push({
        product: product,
        quantity: 1
      });
    }

    this.calcTotalItems();
  }

  removeItem(product: IProduct): void {
    let item = this._cartItems.find(ci => ci.product.id === product.id);
    if(item) {
      if(item.quantity > 1) {
        item.quantity--;
        item.product.available++;
      } else if(item.quantity === 1){
        let idx = this._cartItems.indexOf(item);
        this._cartItems.splice(idx, 1);
        item.product.available++;
      }
    }

    this.calcTotalItems();
  }

  clearCart(): void {
    this._cartItems = [];
    this.calcTotalItems();
  }

  private calcTotalItems(): void {
    let numItems = 0;
    let total = 0
    for (let item of this._cartItems) {
      numItems += item.quantity;
      total += item.product.price * item.quantity;
    }

    this.total = total;
    this.numItems = numItems;
  }
}
