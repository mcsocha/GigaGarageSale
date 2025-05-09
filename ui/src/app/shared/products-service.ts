import { Injectable, inject } from "@angular/core";
import { IProduct } from "../../../../shared/i-product";
import { GigaHttpClient } from "./giga-http-client";
import { Observable } from "rxjs";

/**
 * Singleton service providing acess to all products
 */
@Injectable({ providedIn: 'root' })
export class ProductsService {

  gigaHttpClient: GigaHttpClient = inject(GigaHttpClient);

  private resetProducts$: Observable<void>;
  private getProducts$: Observable<IProduct[]>;
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
        if (!this.resetProducts$) { // lazy-loaded to ensure a single call resetProducts and getProducts API endpoints per lifetime of this singleton.
          this.resetProducts$ = this.gigaHttpClient.resetProducts();
        }

        this.resetProducts$.subscribe({
          next: () => {
            if(!this.getProducts$) {
              this.getProducts$ = this.gigaHttpClient.getProducts();
            }

            this.getProducts$.subscribe({
              next: (products: IProduct[]) => {
                this._products = products;
                resolve(products);
              },
              error: (err) => {
                reject(err);
              }
            });
          },
          error: (err) => {
            reject(err);
          }
        });
      });
    }
  }
}
