import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, of, switchMap, tap, throwError } from 'rxjs';
import { Product } from './product';
import { HttpErrorService } from '../utilities/http-error.service';
import { ReviewService } from '../reviews/review.service';
import { Review } from '../reviews/review';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // Just enough here for the code to compile
  private productsUrl = 'api/products';

  private http = inject(HttpClient);
  private reviewService = inject(ReviewService);

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl)
      .pipe(
        tap(() => console.log('In http.get pipeline')),
        catchError(err => this.handleError(err))
      );
  }

  // Get one product
  getProduct(id: number): Observable<Product> {
    const productUrl = this.productsUrl + '/' + id;
    return this.http.get<Product>(productUrl)
      .pipe(
        tap(() => console.log('In http.get by id pipeline')),
        switchMap(product => this.getReviews(product)),
        catchError(err => this.handleError(err))
      );
  }

  private getReviews(product: Product): Observable<Product> {
    if (product.hasReviews) {
      return this.http.get<Review[]>(this.reviewService.getReviewUrl(product.id))
        .pipe(
          map(reviews => ({ ...product, reviews} as Product))
        )
    } else {
        return of(product);
    }
  }

  private errorService = inject(HttpErrorService);
  handleError(err: HttpErrorResponse): Observable<never> {
    const formattedMessage = this.errorService.formatError(err);
    return throwError(() => formattedMessage);
    //throw formattedMessage;
  }
}
