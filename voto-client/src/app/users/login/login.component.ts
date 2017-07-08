import { Component } from '@angular/core';
import { FacebookService, LoginResponse } from "ngx-facebook";

import { UserService } from "./../../shared/services";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(
    private facebookService: FacebookService,
    private userService: UserService
  ) {
    facebookService.init({
      appId: "1795637644083185",
      version: "v2.9"
    });
  }

  isLoggedIn: boolean = false;

  status: any;

  fbLogin() {

    this.facebookService.login()
    .then((res: LoginResponse) => {
      return this.apiLogin(res.authResponse.accessToken);
    })
    .catch(console.log);
  }

  apiLogin(token: string) {
    this.userService.signup(token);
  }

  logout(): void {
    this.userService.logout();
  }

}
