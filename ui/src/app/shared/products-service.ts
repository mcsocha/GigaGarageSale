import { Injectable, inject } from "@angular/core";
import { IProduct } from "../../../../shared/i-product";
import { GigaHttpClient } from "./giga-http-client";

/**
 * Singleton service providing acess to all products
 */
@Injectable({ providedIn: 'root' })
export class ProductsService {

  gigaHttpClient: GigaHttpClient = inject(GigaHttpClient);

  private _products: IProduct[];
  /**
   * Retrieves the lazy-loaded products collection.
   */
  get products$(): Promise<IProduct[]> {
    if (this._products) {
      return new Promise<IProduct[]>((resolve, reject) => {
        resolve(this._products);
      });
    } else {
      return new Promise((resolve, reject) => {
        this.gigaHttpClient.getProducts().subscribe({
          next: (products: IProduct[]) => {
            this._products = products;
            resolve(this._products);
          },
          error: (err) => {
            reject(err);
          }
        });
      });
    }
  }
}
