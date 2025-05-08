import { Routes } from '@angular/router';
import { ShopComponent } from './shop/shop.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { AboutComponent } from './about/about.component';
import { CartComponent } from './cart/cart.component';

export const routes: Routes = [
    { path: 'shop', component: ShopComponent },
    { path: 'product/:id', component: ProductDetailComponent },
    { path: 'about', component: AboutComponent },
    { path: 'cart', component: CartComponent },
    { path: '',   redirectTo: 'shop', pathMatch: 'full' }
];
