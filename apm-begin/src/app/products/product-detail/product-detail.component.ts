import { Component, inject, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';

import { NgIf, NgFor, CurrencyPipe } from '@angular/common';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'pm-product-detail',
    templateUrl: './product-detail.component.html',
    standalone: true,
    imports: [NgIf, NgFor, CurrencyPipe]
})
export class ProductDetailComponent implements OnChanges, OnDestroy {
  // Just enough here for the template to compile
  @Input() productId: number = 0;
  errorMessage = '';

  private productService = inject(ProductService);
  // Product to display
  product: Product | null = null;

  private subscription = new Subscription();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["productId"]) {
      const id = changes["productId"].currentValue;

      this.subscription.add( this.productService.getProduct(id).subscribe({
        next: product => this.product = product,
        error: err => this.errorMessage = err
      }));
     
    }
  }

  // Set the page title
  pageTitle = this.product ? `Product Detail for: ${this.product.productName}` : 'Product Detail';

  addToCart(product: Product) {
  }

  ngOnDestroy(): void {
    if(this.subscription) {
        this.subscription.unsubscribe();
    }
  }
}
