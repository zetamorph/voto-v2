import { Component, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from "@angular/router";

import { SemanticSidebarComponent, SemanticMessageComponent } from "ng-semantic/ng-semantic";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
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

}
