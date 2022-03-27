import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private toastService: ToastrService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError((err:HttpErrorResponse) => {
      if(err.status == 0){
        this.toastService.error("Error al conectar con el servidor");
      }else{
        this.toastService.error(err.error.error.message);
      }
      return new Observable<HttpEvent<any>>();
    }))
  }
}