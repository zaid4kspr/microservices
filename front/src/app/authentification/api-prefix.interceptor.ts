import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthServiceZ } from './auth-service.service';
import { Inject, PLATFORM_ID } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { isPlatformBrowser } from '@angular/common';

/**
 * Prefixes all requests with `environment.serverUrl`.
 */
@Injectable({
  providedIn: 'root',
})
export class ApiPrefixInterceptor implements HttpInterceptor {
  constructor(
    public router: Router,
    public AuthService: AuthServiceZ,
    @Inject(PLATFORM_ID) private platformId: Object,
    private toastr: ToastrService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): any {
    let token: string;

    if (
      isPlatformBrowser(this.platformId) &&
      localStorage.getItem('connectedAdmin')
    ) {


      token = JSON.parse(localStorage.getItem('connectedAdmin')).token;

      if (token && !request.headers.get("Authorization")) {
        request = request.clone({
          headers: request.headers.set('Authorization', token),
        });
      }

    }

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status == 403) {


          /// this.AuthService.logout();
          /// this.router.navigate(['/auth/login']);

          let errotMsg = 'Unauthorized access'
          if (error.error.message) {
            errotMsg = error.error.message
          }
          this.toastr.warning(' Désolé capitaine, nous ne pouvons pas répondre à votre demande !', errotMsg);
          this.router.navigate(['/auth/login']);

        } else if (error.status == 401) {
          this.AuthService.logout();
          this.router.navigate(['/auth/login']);

        } else if
          (error.status == 405) {
          let errotMsg = 'Unauthorized access'
          if (error.error.message) {
            errotMsg = error.error.message
          }
          this.toastr.warning(' Désolé capitaine, nous ne pouvons pas répondre à votre demande !', errotMsg);
        }

        return throwError(error);
      })
    );
  }
}
