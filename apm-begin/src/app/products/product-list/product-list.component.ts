import { Component, inject } from '@angular/core';

import { NgClass, NgFor, NgIf } from '@angular/common';
import { catchError, EMPTY, Subscription } from 'rxjs';
import { Product } from '../product';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { ProductService } from '../product.service';

@Component({
    selector: 'pm-product-list',
    templateUrl: './product-list.component.html',
    standalone: true,
  imports: [NgIf, NgFor, NgClass, ProductDetailComponent]
})
export class ProductListComponent {
  // Just enough here for the template to compile
  pageTitle = 'Products';
  errorMessage = '';

  private subscription: Subscription = new Subscription();
  private productService = inject(ProductService);
  products: Product[] = [];

  // Selected product id to highlight the entry
  selectedProductId: number = 0;

  ngOnInit(): void {

    this.subscription.add(
      this.productService.getProducts().pipe(catchError(err => {
        this.errorMessage = err;
        return EMPTY;
    })).subscribe(products => this.products = products)
    );
  }

  onSelected(productId: number): void {
    this.selectedProductId = productId;
  }
}
