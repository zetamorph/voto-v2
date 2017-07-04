import { Injectable } from "@angular/core";
import { Response, Headers } from "@angular/http";
import { Router } from "@angular/router";
import { HttpInterceptorService } from "ng-http-interceptor";
import { getHttpHeadersOrInit } from "ng-http-interceptor";
import { Observable } from "rxjs/Rx";

@Injectable()
export class HttpAuthInterceptorService {
  constructor(
    private httpInterceptor: HttpInterceptorService,
    private router: Router
  ) {
    this.init();
  }
  
  private init() {
    this.httpInterceptor.request().addInterceptor(this.requestInterceptor);
    //this.httpInterceptor.request().addInterceptor(this.responseInterceptor);
  }

  private requestInterceptor = (data: any[], method: string): any[] => {
    if(localStorage.getItem("jwt")) {
      const AuthToken = JSON.parse(localStorage.getItem("jwt")).token;
      const headers = getHttpHeadersOrInit(data, method);
      headers.append("Authorization", AuthToken);
      return data;
    }
    return data;
  }

  /*
  private responseInterceptor = (originalResponse: Observable<Response>, method: string): Observable<Response> => {
    originalResponse.subscribe(
      (res: Response) => {},
      (error: Response) => {
        if(error.status === 401) {
          this.router.navigateByUrl("/login");
        }
      }
    );
    return originalResponse;
  }
  */
}