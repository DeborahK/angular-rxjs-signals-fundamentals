import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private reviewsUrl = 'api/reviews';

  getReviewUrl(productId: number): string {
    // Use appropriate regular expression syntax to
    // get an exact match on the id
    return this.reviewsUrl + '?productId=^' + productId + '$';
  }
}
