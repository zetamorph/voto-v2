import { Injectable } from "@angular/core";
import { Http, Headers, Response, URLSearchParams } from "@angular/http";
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

import { environment } from "./../../../environments/environment";

import { TokenService } from "./token.service";

@Injectable()
export class ApiService {
  constructor(
    private http: Http,
    private tokenService: TokenService
  ) {}

  private setHeaders(customHeaders: Object = null): Headers {
    
    let headers = {
      "Content-Type": "application/json",
      "Accept": "application/json"
    };

    if(customHeaders !== null) {
      headers = Object.assign({}, headers, customHeaders);
    }

    /* If a token is set, append it to the request */
    if(this.tokenService.getToken()) {
      headers["Authorization"] = this.tokenService.getToken();
    }
    
    return new Headers(headers);
  }

  get(resource: string, params?: URLSearchParams): Observable<any> {
    return this.http.get(`${environment.apiUrl}${resource}`, { headers: this.setHeaders(), params: params })
    .catch(this.handleError)
    .map((res: Response) => res.json());
  }

  post(resource: string, body: Object, customHeaders?: Object): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}${resource}`, 
      JSON.stringify(body), 
      { headers: this.setHeaders(customHeaders) }
    )
    .catch(this.handleError)
  } 

  delete(resource): Observable<any> {
    return this.http.delete(
      `${environment.apiUrl}${resource}`,
      { headers: this.setHeaders() }
    )
    .catch(this.handleError)
  }

  handleError(error: any) {
    return Observable.throw(error.json());
  }

}