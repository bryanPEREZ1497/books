import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { LoginModel } from '../models/login.model';
import { LoginResponse } from '../models/login-response.model';

@Injectable({
  providedIn: 'root'
})

export class HttpService {
  API_URL: string = environment.API_URL;

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService) { }

  getAuthors(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    const url = this.API_URL + '/authors';

    return this.httpClient.get(url, { headers })
      .pipe(
        map(response => response),
        catchError(error => error)
      );
  }

  login(credentials: LoginModel):Observable<LoginResponse> {
    const url = `${this.API_URL}/auth/login`;
    return this.httpClient.post<LoginResponse>(url, credentials)
      .pipe(
        map(response => response),
        tap(
          response => {
            this.authService.token = response.token;
            this.authService.user = response.data.user;
          }
        ),
        catchError(error => {
          this.authService.removeLogin();
          return throwError(error);
        })
      );
  }
}
