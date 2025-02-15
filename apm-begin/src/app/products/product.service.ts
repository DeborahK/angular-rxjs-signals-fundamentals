import { HttpBackend, HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsUrl = 'api/products';

  private http = inject(HttpClient);

    // constructor(private http: HttpClient) { }

    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(this.productsUrl)
        .pipe(
            tap(data => console.log(data))
        )
    }

    getProduct(id: number): Observable<Product> {
        const url = `${this.productsUrl}/${id}`;
        
        return this.http.get<Product>(url)
        .pipe(
            tap(data => console.log(data))
        )
    }

}
