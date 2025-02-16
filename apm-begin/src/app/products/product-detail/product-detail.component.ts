import { Component, inject, Input, SimpleChanges } from '@angular/core';

import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { catchError, EMPTY, Subscription } from 'rxjs';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
    selector: 'pm-product-detail',
    templateUrl: './product-detail.component.html',
    standalone: true,
    imports: [NgIf, NgFor, CurrencyPipe]
})
export class ProductDetailComponent {
  // Just enough here for the template to compile
  @Input() productId: number = 0;
  errorMessage = '';

  // Product to display
  product: Product | null = null;
  private productService = inject(ProductService);

  private subscription = new Subscription();

  ngOnChanges(changes: SimpleChanges): void {
    this.errorMessage = '';
    
    if (changes["productId"]) {
      const id = changes["productId"].currentValue;

      this.subscription.add( this.productService.getProduct(id).pipe(catchError(err => {
              this.errorMessage = err;
              return EMPTY;
          })).subscribe(product => this.product = product)
        );
    }
  }

  // Set the page title
  pageTitle = this.product ? `Product Detail for: ${this.product.productName}` : 'Product Detail';

  addToCart(product: Product) {
  }
}
