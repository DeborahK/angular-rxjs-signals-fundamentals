import { Component, inject, OnDestroy, OnInit } from '@angular/core';

import { NgIf, NgFor, NgClass } from '@angular/common';
import { Product } from '../product';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { ProductService } from '../product.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'pm-product-list',
    templateUrl: './product-list.component.html',
    standalone: true,
  imports: [NgIf, NgFor, NgClass, ProductDetailComponent]
})
export class ProductListComponent implements OnInit, OnDestroy {
  // Just enough here for the template to compile
  pageTitle = 'Products';
  errorMessage = '';

  private productService = inject(ProductService);
  products: Product[] = [];

  private subscription: Subscription = new Subscription();

  // Selected product id to highlight the entry
  selectedProductId: number = 0;

  ngOnInit(): void {

    this.subscription.add(
      this.productService.getProducts().subscribe({
        next: products => {
          this.products = products;
        },
        error: err => this.errorMessage = err
      })
    );
      
  }

  onSelected(productId: number): void {
    this.selectedProductId = productId;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
