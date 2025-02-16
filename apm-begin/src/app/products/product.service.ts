import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { HttpErrorService } from '../utilities/http-error.service';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // Just enough here for the code to compile
  private productsUrl = 'api/products';

  private http = inject(HttpClient);
  private errorService = inject(HttpErrorService);

    // constructor(private http: HttpClient) { }

    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(this.productsUrl)
        .pipe(
            tap(data => console.log(data)),
            catchError(err => this.handleError(err))
        )
    }

    getProduct(id: number): Observable<Product> {
        const url = `${this.productsUrl}/${id}`;
        
        return this.http.get<Product>(url)
        .pipe(
            tap(data => console.log(data)),
            catchError(err => this.handleError(err))
        )
    }

    private handleError(err: HttpErrorResponse): Observable<never> {
      const formattedMessage = this.errorService.formatError(err);
      return throwError(() => formattedMessage);
    }

}
