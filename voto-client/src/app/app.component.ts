import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd } from "@angular/router";
import "rxjs/add/operator/filter";

import { SemanticSidebarComponent } from "ng-semantic/ng-semantic";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild(SemanticSidebarComponent)
  sidebarChild: SemanticSidebarComponent;

  constructor(
    private router: Router
  ) {
    router.events
    .filter(event => event instanceof NavigationEnd)
    .subscribe((event:NavigationEnd) => {
      this.sidebarChild.hide();
    });
  }

  error: string = "please restart computer";

}
