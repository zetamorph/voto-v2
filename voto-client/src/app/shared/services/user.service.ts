import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/observable/empty";

import { ApiService, TokenService } from "./";
import { User } from "./../models";

@Injectable()
export class UserService {
  constructor(
    private apiService: ApiService,
    private tokenService: TokenService
  ) {}
  
  private currentUserSubject = new BehaviorSubject<User>(new User());
  public currentUser = this.currentUserSubject.asObservable().distinctUntilChanged();

  getCurrentUser(): User {
    return this.currentUserSubject.value;
  }

  login(fbToken: string) {
    this.apiService.post("users/", {}, { "access_token": fbToken })
    .subscribe((data) => {
      this.tokenService.setToken(data.token)
      .then(() => {
        this.getUserFromToken();
      });
    });
  }

  logout(): void {
    this.tokenService.deleteToken()
    .then(() => {
      this.getUserFromToken();
    });
  }

  getUserFromToken(): void {
    const token = this.tokenService.getToken();
    if(token) {
      this.apiService.get("user")
      .subscribe(
        user => this.currentUserSubject.next(user)
      )
    } else {
      this.currentUserSubject.next(new User());
    }
  }

}