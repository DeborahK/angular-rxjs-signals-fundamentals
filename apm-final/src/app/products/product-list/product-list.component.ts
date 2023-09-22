import { Component, inject } from '@angular/core';

import { NgIf, NgFor, NgClass, AsyncPipe } from '@angular/common';
import { ProductService } from '../product.service';
import { ProductDetailComponent } from '../product-detail/product-detail.component';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  standalone: true,
  imports: [AsyncPipe, NgIf, NgFor, NgClass, ProductDetailComponent]
})
export class ProductListComponent {
  pageTitle = 'Products';

  private productService = inject(ProductService);

  // Selected product id to highlight the entry
  selectedProductId = this.productService.selectedProductId;

  products = this.productService.products;
  errorMessage = this.productService.productsErrorMessage;

  onSelected(productId: number): void {
    this.productService.productSelected(productId);
  }
}
