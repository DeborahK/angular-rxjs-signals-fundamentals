import { Component, inject } from '@angular/core';

import { NgIf, NgFor, NgClass, AsyncPipe } from '@angular/common';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { ProductService } from '../product.service';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  standalone: true,
  imports: [AsyncPipe, NgIf, NgFor, NgClass, ProductDetailComponent]
})
export class ProductListComponent {
  pageTitle = 'Products';

  private productService = inject(ProductService);

  // Products
  products = this.productService.products;
  errorMessage = this.productService.productsError;

  // Selected product id to highlight the entry
  selectedProductId = this.productService.selectedProductId;

  onSelected(productId: number): void {
    this.productService.productSelected(productId);
  }
}
