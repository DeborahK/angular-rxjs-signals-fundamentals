import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, catchError, combineLatest, filter, map, of, shareReplay, switchMap, tap, throwError } from 'rxjs';
import { Product } from './product';
import { HttpErrorService } from '../utilities/http-error.service';
import { ReviewService } from '../reviews/review.service';
import { Review } from '../reviews/review';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsUrl = 'api/products';

  private http = inject(HttpClient);
  private reviewService = inject(ReviewService);

  private productSelectedSubject = new BehaviorSubject<number | undefined>(undefined);
  readonly productSelected$ = this.productSelectedSubject.asObservable();

  // Get all products
  readonly products$ = this.http.get<Product[]>(this.productsUrl)
    .pipe(
      tap(p => console.log(JSON.stringify(p))),
      shareReplay(1),
      catchError(err => this.handleError(err))
    );

  // Get one product
  readonly product1$ = this.productSelected$
    .pipe(
      switchMap(id => {
        const productUrl = this.productsUrl + '/' + id;
        return this.http.get<Product>(productUrl)
          .pipe(
            tap(() => console.log('In http.get by id pipeline')),
            switchMap(product => this.getReviews(product)),
            catchError(err => this.handleError(err))
          );
      })
    );

  readonly product$ = combineLatest([
    this.productSelected$,
    this.products$
  ]).pipe(
    map(([selectedProductId, products]) =>
      products.find(product => product.id === selectedProductId)
    ),
    filter(Boolean),
    switchMap(product => this.getReviews(product)),
    catchError(err => this.handleError(err))
  )

  productSelected(selectedProductId: number): void {
    this.productSelectedSubject.next(selectedProductId);
  }

  private getReviews(product: Product): Observable<Product> {
    if (product.hasReviews) {
      return this.http.get<Review[]>(this.reviewService.getReviewUrl(product.id))
        .pipe(
          map(reviews => ({ ...product, reviews } as Product))
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
