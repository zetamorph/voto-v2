import { Component, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from "@angular/router";

import { SemanticSidebarComponent } from "ng-semantic/ng-semantic";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild(SemanticSidebarComponent)
  sidebar: SemanticSidebarComponent;

  constructor(
    private router: Router
  ) {
    router.events
    .filter(event => event instanceof NavigationEnd)
    .subscribe((event:NavigationEnd) => {
      this.sidebar.hide();
    });
  }

  goTo(query: object): void {
    this.router.navigate(["/polls"], { queryParams: query });
  }

}
