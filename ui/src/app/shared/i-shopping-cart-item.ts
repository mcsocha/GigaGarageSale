import { IProduct } from "../../../../shared/i-product";

export interface IShoppingCartItem {
  product: IProduct;
  quantity: number;
}
