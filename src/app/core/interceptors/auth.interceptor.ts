import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '@core/services';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private userService: UserService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.userService.isLogin()) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.userService.getAccessToken()}`
        }
      });
    }

    return next.handle(request);
  }
}