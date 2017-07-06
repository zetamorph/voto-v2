import { NgModule, ErrorHandler } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { AppRoutingModule } from "./app-routing.module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FacebookModule } from "ngx-facebook";
import { NgSemanticModule } from "ng-semantic/ng-semantic";
import { ChartsModule } from "ng2-charts";

import { AppComponent } from "./app.component";
import { PollListComponent } from "./polls/poll-list/poll-list.component";
import { PollComponent } from "./polls/poll/poll.component";
import { PollOptionListComponent } from "./polls/poll/poll-options/poll-option-list/poll-option-list.component";
import { PollOptionChartComponent } from "./polls/poll/poll-options/poll-option-chart/poll-option-chart.component";
import { NewPollComponent } from "./polls/new-poll/new-poll.component";
import { LoginComponent } from "./users/login/login.component";

import { ApiService, PollService, OptionService, VoteService, UserService, TokenService } from "./shared";

@NgModule({
  declarations: [
    AppComponent,
    PollListComponent,
    PollComponent,
    PollOptionChartComponent,
    PollOptionListComponent,
    NewPollComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    FlexLayoutModule,
    NgSemanticModule,
    FacebookModule.forRoot(),
    ChartsModule,
    AppRoutingModule
  ],
  providers: [ 
    ApiService,
    PollService,
    OptionService,
    VoteService,
    UserService,
    TokenService 
  ],
  bootstrap: [ AppComponent ],
})
export class AppModule { }
