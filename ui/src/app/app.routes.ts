import { Routes } from '@angular/router';
import { ShopComponent } from './shop/shop.component';
import { AboutComponent } from './about/about.component';
import { CartComponent } from './cart/cart.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';

export const routes: Routes = [
  { path: 'shop', component: ShopComponent },
  { path: 'product-detail/:id', component: ProductDetailComponent },
  { path: 'about', component: AboutComponent },
  { path: 'cart', component: CartComponent },
  { path: 'confirmation', component: ConfirmationComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: '', redirectTo: 'shop', pathMatch: 'full' }
];
