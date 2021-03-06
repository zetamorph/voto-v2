import { Component, ViewChild, OnInit } from '@angular/core';
import { Router, NavigationEnd } from "@angular/router";
import "rxjs/add/operator/filter";

import { SemanticSidebarComponent } from "ng-semantic/ng-semantic";
import { FlashComponent } from "./shared/components/flash/flash.component";

import { UserService } from "./shared/services";
import { User } from "./shared/models";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild(SemanticSidebarComponent)
  sidebarChild: SemanticSidebarComponent;

  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  currentUser: User;

  loggedIn() {
    return Object.keys(this.currentUser).length !== 0;
  }

  ngOnInit() {

    // hide the sidebar whenever navigation is finished
    this.router.events
    .filter(event => event instanceof NavigationEnd)
    .subscribe((event:NavigationEnd) => {
      this.sidebarChild.hide();
    });

    this.userService.currentUser.subscribe(
      (user: User) => {
        this.currentUser = user;
      }
    );

    this.userService.getUserFromToken();

  }

  logout(): void {
    this.userService.logout();
    this.router.navigateByUrl("/");
  }

}
