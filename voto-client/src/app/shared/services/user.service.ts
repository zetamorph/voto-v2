import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import { ApiService, TokenService } from "./";
import { User } from "./../models";

@Injectable()
export class UserService {
  constructor(
    private apiService: ApiService,
    private tokenService: TokenService
  ) {}

  signup(fbToken: string) {
    this.apiService.post("users/", {}, { "access_token": fbToken })
    .subscribe(
      data => this.tokenService.setToken(data.token)
    );
  }

  logout(): void {
    this.tokenService.deleteToken();
  }

}