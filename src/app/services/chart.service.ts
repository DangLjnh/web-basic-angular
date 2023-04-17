import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  private BACKEND_URL = 'https://api.covid19api.com/';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
      // Authorization: 'my-auth-token',
      // Authorization: 'Basic ' + btoa('username:password'),
    }),
  };

  constructor(private httpClient: HttpClient) {}

  public getAll() {
    return this.httpClient
      .get(this.BACKEND_URL, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  public getSummary() {
    return this.httpClient
      .get(`${this.BACKEND_URL}/summary`)
      .pipe(catchError(this.handleError));
  }

  public getByCountryCode(countryCode: string) {
    return this.httpClient
      .get(`${this.BACKEND_URL}/live/country/${countryCode}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; Please try again or check chat service.'
    );
  }
}
