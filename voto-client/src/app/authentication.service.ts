import { Injectable } from "@angular/core";
import { Headers, Http, Response, RequestOptions } from "@angular/http";
import { User } from "./user";
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthenticationService {
  constructor(private http: Http) {}
  apiUrl = "http://localhost:8000/";

  signIn(fbToken: string): Observable<Response> {
    let headers = new Headers({ "access_token": fbToken});
    let options = new RequestOptions({headers: headers});
    return this.http.post(this.apiUrl + "users/", {}, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

}