// jwt.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpEventType,
} from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { UserService } from './services/commonSignup.service';
import { Router } from '@angular/router';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: UserService, private router: Router) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const one = localStorage.getItem('token');

    request = request.clone({
      setHeaders: {
        Authorization: `${one}`,
      },
    });

    return next.handle(request);
  }
}
