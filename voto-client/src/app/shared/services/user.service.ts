import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ApiService, TokenService } from "./";
import { User } from "./../models";

@Injectable()
export class UserService {
  constructor(
    private apiService: ApiService,
    private tokenService: TokenService
  ) {}

  signup(fbToken: string): Observable<Response> {
    return this.apiService.post("users/", {}, { "access_token": fbToken })
      .map(data => this.tokenService.setToken(data.token))
      .catch((error: any) => Observable.throw(error.json().error));
  }

  signout(): void {
    this.tokenService.deleteToken();
  }

}