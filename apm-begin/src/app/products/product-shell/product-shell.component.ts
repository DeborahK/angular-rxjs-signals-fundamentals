import { Component } from '@angular/core';
import { ProductListComponent } from '../product-list/product-list.component';
import { ProductDetailComponent } from '../product-detail/product-detail.component';

@Component({
    templateUrl: './product-shell.component.html',
    standalone: true,
    imports: [ProductListComponent, ProductDetailComponent]
})
export class ProductShellComponent {

}
