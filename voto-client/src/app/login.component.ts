import { Component } from '@angular/core';
import { FacebookService, LoginResponse } from "ngx-facebook";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(
    private facebookService: FacebookService
  ) {
    console.log("Initializing FacebookService");

    facebookService.init({
      appId: "1795637644083185",
      version: "v2.9"
    });
  }

  fbLogin() {
    this.facebookService.login()
    .then((res: LoginResponse) => {
      console.log("logged in!", res);
      
    })
    .catch(console.log);
  }

  fbLogout() {
    this.facebookService.logout()
    .then(() => {
      console.log("logged out!");
    })
    .catch(console.error);
  }
}
