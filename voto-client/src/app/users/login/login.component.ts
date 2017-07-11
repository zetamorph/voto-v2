import { Component } from "@angular/core";
import { FacebookService, LoginResponse } from "ngx-facebook";

import { environment } from "./../../../environments/environment";

import { UserService, MessageService } from "./../../shared/services";

@Component({
  selector: "login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent {
  constructor(
    private facebookService: FacebookService,
    private userService: UserService,
    private messageService: MessageService
  ) {
    facebookService.init({
      appId: environment.fbAppId,
      version: "v2.9"
    });
  }

  fbLogin() {
    this.facebookService.login()
    .then((res: LoginResponse) => {
      return this.apiLogin(res.authResponse.accessToken);
    })
    .catch(console.log);
  }

  apiLogin(token: string) {
    this.userService.login(token);
  }

}
