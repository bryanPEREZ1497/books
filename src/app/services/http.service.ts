import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { LoginModel } from '../models/login.model';
import { LoginResponse } from '../models/login-response.model';
import { BookModel } from '../models/book.model';
import { ServerResponse } from '../models/server-response';

@Injectable({
  providedIn: 'root'
})

export class HttpService {
  API_URL: string = environment.API_URL;

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService) { }

  getAuthors(): Observable<any> {
    const url = this.API_URL + '/authors';

    return this.httpClient.get(url)
      .pipe(
        map(response => response),
        catchError(error => {
          return throwError(
            () => this.handleError<any[]>('getAuthors', [])
          );
        })
      );
  }

  getBooks(): Observable<ServerResponse> {
    const url = this.API_URL + '/books';

    return this.httpClient.get<ServerResponse>(url)
      .pipe(
        map(response => response),
        catchError(error => {
          return throwError(
            () => this.handleError<any[]>('getBooks', [])
          );
        })
      );
  }


  storeBook(book: BookModel): Observable<ServerResponse> {
    const url = `${this.API_URL}/books`;
    return this.httpClient.post<ServerResponse>(url, book)
      .pipe(
        map(response => response),
        catchError(error => {
          return throwError(
            () => this.handleError<any[]>('storeBook', [])
          );
        })
      );
  }

  getBook(id: number): Observable<ServerResponse> {
    const url = `${this.API_URL}/books/${id}`;
    return this.httpClient.get<ServerResponse>(url)
      .pipe(
        map(response => response),
        catchError(error => {
          return throwError(
            () => this.handleError<any[]>('getBook', [])
          );
        })
      );
  }

  updateBook(id: number, book: BookModel): Observable<ServerResponse> {
    const url = `${this.API_URL}/books/${id}`;
    return this.httpClient.put<ServerResponse>(url, book)
      .pipe(
        map(response => response),
        catchError(error => {
          return throwError(
            () => this.handleError<any[]>('updateBook', [])
          );
        })
      );
  }

  deleteBook(id: number): Observable<ServerResponse> {
    const url = `${this.API_URL}/books/${id}`;
    return this.httpClient.delete<ServerResponse>(url)
      .pipe(
        map(response => response),
        catchError(error => {
          return throwError(
            () => this.handleError<any[]>('deleteBook', [])
          );
        })
      );
  }

  deleteBooks(ids: (number | undefined)[]): Observable<ServerResponse> {
    const url = `${this.API_URL}/book`;
    return this.httpClient.patch<ServerResponse>(url, { ids })
      .pipe(
        map(response => response),
        catchError(error => {
          return throwError(
            () => this.handleError<any[]>('deleteBooks', [])
          );
        })
      );
  }

  login(credentials: LoginModel): Observable<LoginResponse> {
    const url = `${this.API_URL}/auth/login`;
    return this.httpClient.post<LoginResponse>(url, credentials)
      .pipe(
        map(response => response),
        tap(
          response => {
            this.authService.token = response.token;
            this.authService.user = response.data;
          }
        ),
        catchError(error => {
          this.authService.removeLogin();
          return throwError(
            () => this.handleError<any[]>('login', [])
          );
        })
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(mensaje: string): void {
    console.log(mensaje);
  }
}
