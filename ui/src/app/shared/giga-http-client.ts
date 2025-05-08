import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { IProduct } from "../../../../shared/i-product";
import { IReservationRequest } from "../../../../shared/i-reservation-request";
import { Observable } from "rxjs/internal/Observable";

@Injectable({ providedIn: 'root' })
export class GigaHttpClient {

  readonly apiBaseUrl: string = 'http://localhost:3000/api';

  httpClient: HttpClient = inject(HttpClient);
  constructor() {
  }

  getProducts(): Observable<IProduct[]> {
    let url = `${this.apiBaseUrl}/products`;
    console.log(`Getting products from ${url}`);
    return this.httpClient.get<IProduct[]>(url);
  }

  getProduct(productId: number): Observable<IProduct> {
    let url = `${this.apiBaseUrl}/products/${productId}`;
    console.log(`Getting product from ${url}`);
    return this.httpClient.get<IProduct>(url);
  }

  /**
   * Updates the available quantity of a product.
   * @param productId
   * @param quantity
   * @param reserve True to reduce quantity, False to increase quantity.
   * @returns
   */
  updateReservation(productId: number, quantity: number, reserve: boolean): Observable<void> {
    let request: IReservationRequest = {
      quantity: quantity,
      reserve: reserve
    };
    return this.httpClient.patch<void>(`http://localhost:3000/api/products/${productId}`, request);
  }
}
