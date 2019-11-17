import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class ErrorInterceptor implements HttpInterceptor {

  // constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
      catchError(error => {

        if (error instanceof HttpErrorResponse) {

          // if (error.status === 401) {
          //   return throwError(error.statusText);
          // }
          // if the errors are thrown from withing the code
          // note when we throw excpetions from our code, our middleware adds the Application-Error header
          const applicationError = error.headers.get('Application-Error');
          if (applicationError) {
            console.error(applicationError);
            return throwError(applicationError);
          }

          // if the errors is any other server error like model state error
          const serverError = error.error;
          let modelStateError = '';
          modelStateError = this.HandleModelStateEror(serverError, modelStateError);

          return throwError(modelStateError || serverError || 'Server Error');
        }
      })
    );
  }

  public HandleModelStateEror(serverError: any, modelStateError: string) {

    if (serverError && typeof serverError === 'object') {
      for (const key in serverError) {
        if (typeof serverError[key] === 'object') {
          modelStateError = this.HandleModelStateEror(serverError[key], modelStateError);
        } else if (typeof serverError[key] !== 'object') {
          modelStateError += serverError[key] + '\n';
        }
      }
    }
    return modelStateError;
  }

}

export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true
};
