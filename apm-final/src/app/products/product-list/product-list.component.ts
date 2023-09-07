import { Component, inject } from '@angular/core';

import { NgIf, NgFor, NgClass, AsyncPipe } from '@angular/common';
import { ProductService } from '../product.service';
import { EMPTY, catchError } from 'rxjs';
import { ProductDetailComponent } from '../product-detail/product-detail.component';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  standalone: true,
  imports: [AsyncPipe, NgIf, NgFor, NgClass, ProductDetailComponent]
})
export class ProductListComponent {
  pageTitle = 'Products';
  errorMessage = '';

  productService = inject(ProductService);

  // Selected product id to highlight the entry
  selectedProductId: number = 0;

  products$ = this.productService.products$
  .pipe(
    catchError(err => {
      this.errorMessage = err;
      return EMPTY;
    })
  );

  onSelected(productId: number): void {
    this.selectedProductId = productId;
  }
}
