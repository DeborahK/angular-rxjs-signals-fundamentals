import { Component, Input, computed, inject, signal } from '@angular/core';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CartItem } from '../cart';
import { CartService } from '../cart.service';

@Component({
  selector: 'sw-cart-item',
  standalone: true,
  imports: [CurrencyPipe, FormsModule, NgFor, NgIf],
  templateUrl: './cart-item.component.html'
})
export class CartItemComponent {
  private cartService = inject(CartService);

  // Use a setter to set the signal 
  // when the item is passed in from the parent component
  @Input({ required: true, alias: 'cartItem' }) set item(item: CartItem) {
    this.cartItem.set(item);
  }

  cartItem = signal<CartItem>(undefined!);

  // Quantity available (hard-coded to 8)
  // Mapped to an array from 1-8
  //qtyArr = [...Array(8).keys()].map(x => x + 1);

  // Build an array of numbers from 1 to qty available
  qtyArr = computed<Number[]>(() =>
    [...Array(this.cartItem().product.quantityInStock).keys()].map(x => x + 1));

  // Calculate the extended price
  exPrice = computed(() => this.cartItem().quantity * this.cartItem().product.price);

  onQuantitySelected(quantity: number): void {
    this.cartService.updateQuantity(this.cartItem(), Number(quantity));
  }

  removeFromCart(): void {
    this.cartService.removeFromCart(this.cartItem());
  }
}
