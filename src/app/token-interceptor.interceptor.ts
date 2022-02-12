import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptorInterceptor implements HttpInterceptor {

  constructor() { }
  
  headers = new HttpHeaders()
    .append('Accept', 'application/json')
    .append('Content-Type', 'application/json')
    .append('Authorization', 'Bearer ' + '3|vbLqzvGEHXaaXiUrfuO8GPMo9HwvUApUiSI370D4');

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request.clone({ headers: this.headers }));
  }
}
