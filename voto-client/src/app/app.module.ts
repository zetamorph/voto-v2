import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { AppRoutingModule } from "./app-routing.module";
import { HttpInterceptorModule } from "ng-http-interceptor";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FacebookModule } from "ngx-facebook";
import { NgSemanticModule } from "ng-semantic/ng-semantic";

import { AppComponent } from "./app.component";
import { PollsComponent } from "./polls.component";
import { PollDetailComponent } from "./poll-detail.component";
import { ChartComponent } from "./chart.component";
import { NewPollComponent } from "./new-poll.component";
import { LoginComponent } from "./login.component";

import { PollService } from "./poll.service";
import { OptionService } from "./option.service";
import { UserService } from "./user.service";

import { HttpAuthInterceptorService } from "./http-interceptor.service";

@NgModule({
  declarations: [
    AppComponent,
    PollsComponent,
    PollDetailComponent,
    NewPollComponent,
    LoginComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    FlexLayoutModule,
    NgSemanticModule,
    HttpInterceptorModule,
    FacebookModule.forRoot(),
    AppRoutingModule
  ],
  providers: [ 
    PollService, 
    UserService,
    OptionService,
    HttpAuthInterceptorService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
