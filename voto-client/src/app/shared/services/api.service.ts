import { Injectable } from "@angular/core";
import { Http, Headers, Response, URLSearchParams } from "@angular/http";
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/observable/empty";

import { environment } from "./../../../environments/environment";

import { Message } from "./../models";
import { TokenService } from "./token.service";
import { MessageService } from "./message.service";

@Injectable()
export class ApiService {
  constructor(
    private http: Http,
    private tokenService: TokenService,
    private messageService: MessageService
  ) {}

  private setHeaders(customHeaders: Object = null): Headers {
    
    let headers = {
      "Content-Type": "application/json",
      "Accept": "application/json"
    };

    if (customHeaders !== null) {
      headers = Object.assign({}, headers, customHeaders);
    }

    /* If a token is set, append it to the request */
    if (this.tokenService.getToken()) {
      headers["Authorization"] = this.tokenService.getToken();
    }
    
    return new Headers(headers);
  }

  get(resource: string, params?: URLSearchParams): Observable<any> {
    return this.http.get(`${environment.apiUrl}${resource}`, { headers: this.setHeaders(), params: params })
    .map((res: Response) => res.json())
    .catch(this.handleError.bind(this));
  }

  post(resource: string, body: Object, customHeaders?: Object): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}${resource}`, 
      JSON.stringify(body), 
      { headers: this.setHeaders(customHeaders) }
    )
    .map((res: Response) => res.json())
    .catch(this.handleError.bind(this));
  } 

  delete(resource): Observable<any> {
    return this.http.delete(
      `${environment.apiUrl}${resource}`,
      { headers: this.setHeaders() }
    )
    .map((res: Response) => res.json())
    .catch(this.handleError.bind(this));
  }

  handleError(error: any) {
    /* Since passport-jwt on the backend doesn´t respond with an error object in the body, 
    we have to process it differently */
    if (error.status === 401) {
      this.messageService.setMessage(new Message(0, "Please log in to do that."));
    } else {
      this.messageService.setMessage(new Message(0, error.json().error || ""));
    }
    return Observable.empty();
  }

}