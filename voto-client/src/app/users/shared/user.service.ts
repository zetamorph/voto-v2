import { Injectable } from "@angular/core";
import { Headers, Http, Response, RequestOptions } from "@angular/http";
import { User } from "./user.model";
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class UserService {
  constructor(private http: Http) {}
  apiUrl = "http://localhost:8000/";

  signup(fbToken: string): Observable<Response> {
    let headers = new Headers({ "access_token": fbToken});
    let options = new RequestOptions({headers: headers});
    return this.http.post(this.apiUrl + "users/", {}, options)
      .map((res: Response) => {
        let token = res.json().token;
        if (token) {
          localStorage.setItem("jwt", JSON.stringify({ token: token }));
          return true;
        } else {
          return false;
        }
        
      })
      .catch((error: any) => Observable.throw(error.json().error));
  }

  signOut(): void {
    if(localStorage.getItem("jwt")) {
      localStorage.removeItem("jwt");
    }
  }

}