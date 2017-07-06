import { NgModule, ErrorHandler } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { AppRoutingModule } from "./app-routing.module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FacebookModule } from "ngx-facebook";
import { NgSemanticModule } from "ng-semantic/ng-semantic";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppComponent } from "./app.component";
import { PollListComponent } from "./polls/poll-list/poll-list.component";
import { PollComponent } from "./polls/poll/poll.component";
import { NewPollComponent } from "./polls/new-poll/new-poll.component";
import { LoginComponent } from "./users/login/login.component";

import { ApiService, PollService, OptionService, VoteService, UserService, TokenService } from "./shared";

@NgModule({
  declarations: [
    AppComponent,
    PollListComponent,
    PollComponent,
    NewPollComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    FlexLayoutModule,
    NgSemanticModule,
    FacebookModule.forRoot(),
    AppRoutingModule,
    BrowserAnimationsModule
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
