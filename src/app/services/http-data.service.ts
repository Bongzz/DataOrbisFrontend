import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Product } from '../models/product';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpDataService {
  // API path
  basePath = 'http://localhost:3000/products';

  constructor(private http: HttpClient) { }
    // Http Options
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };
      // Handle API errors
    handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`
            );
        }
        // return an observable with a user-facing error message
        return throwError(
            'Something bad happened; please try again later.'
        );
    }

    // Create a new product
    createItem(product: Product): Observable<Product> {
        return this.http
          .post<Product>(this.basePath, JSON.stringify(product), this.httpOptions)
          .pipe(
            retry(2),
            catchError(this.handleError)
        );
    }

    // Get single product data by product Id
    getItem(productId: number): Observable<Product> {
        return this.http
        .get<Product>(this.basePath + '/' + productId)
        .pipe(
            retry(2),
            catchError(this.handleError)
        );
    }

    // Get product data
    getList(): Observable<Product> {
        return this.http
          .get<Product>(this.basePath)
          .pipe(
            retry(2),
            catchError(this.handleError)
        );
    }

    // Update product by product Id
    updateItem(productId: number, product: Product): Observable<Product> {
        return this.http
        .put<Product>(this.basePath + '/' + productId, JSON.stringify(product), this.httpOptions)
        .pipe(
            retry(2),
            catchError(this.handleError)
        );
    }
    // Delete product by product id
    deleteItem(productId: number) {
        return this.http
          .delete<Product>(this.basePath + '/' + productId, this.httpOptions)
          .pipe(
            retry(2),
            catchError(this.handleError)
        );
    }


}
