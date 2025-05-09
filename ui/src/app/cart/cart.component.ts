import { Component, inject } from '@angular/core';
import { ShoppingCartService } from '../shared/shopping-cart-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [
    CommonModule    
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  cartSvc: ShoppingCartService = inject(ShoppingCartService);
  productSvc: ShoppingCartService = inject(ShoppingCartService);

  confirmationDialog(): void {
    this.cartSvc.clearCart();
    alert('Your order has been placed successfully!');
  }
}
