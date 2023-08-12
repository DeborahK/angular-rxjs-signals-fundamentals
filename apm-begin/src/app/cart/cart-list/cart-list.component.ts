import { Component } from '@angular/core';
import { NgFor, NgIf, CurrencyPipe } from '@angular/common';
import { CartItem } from '../cart';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'sw-cart-list',
    standalone: true,
    imports: [NgFor, NgIf, CurrencyPipe, FormsModule],
    templateUrl: 'cart-list.component.html'
})
export class CartListComponent {
  // Just enough here for the template to compile
  pageTitle = 'Cart';

  cartItems: CartItem[] = [];
  qtyAvailable = [1, 2, 3, 4, 5, 6, 7, 8];

  onQuantitySelected(item: CartItem, quantity: number): void {
  }

  removeFromCart(item: CartItem): void {
  }
}
