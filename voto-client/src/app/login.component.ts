import { Component } from '@angular/core';
import { FacebookService, LoginResponse } from "ngx-facebook";

import { UserService } from "./user.service";

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

  status: any;

  fbLogin() {
    this.facebookService.login()
    .then((res: LoginResponse) => {
      return this.apiLogin(res.authResponse.accessToken);
    })
    .catch(console.log);
  }

  fbLogout() {
    this.facebookService.logout()
    .then(() => {
      this.apiLogout();
    })
    .catch(console.error);
  }

  apiLogin(token: string) {
    this.userService.signup(token)
      .subscribe(
        success => this.status = status,
        err => console.log(err)
      )
  }

  apiLogout(): void {
    this.userService.signOut();
  }

}
