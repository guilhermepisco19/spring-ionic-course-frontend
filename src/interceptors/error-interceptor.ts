import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ErroInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("Passed through the interceptor");
    return next.handle(req)
    .catch((error, caught) =>{

        let errorObj = error;
        if(errorObj.error){
            errorObj = errorObj.error;
        }
        if(!errorObj.status){
            errorObj = JSON.parse(errorObj);
        }

        console.log("Error detected by interceptor");
        console.log(errorObj);

        return Observable.throw(errorObj);
    }) as any;
  }
}

export const ErrorInterceptorProvider = { 
    provide: HTTP_INTERCEPTORS, 
    useClass: ErroInterceptor, 
    multi: true 
};