import { NgModule, ErrorHandler } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { AppRoutingModule } from "./app-routing.module";
import { HttpInterceptorModule } from "ng-http-interceptor";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FacebookModule } from "ngx-facebook";
import { NgSemanticModule } from "ng-semantic/ng-semantic";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppComponent } from "./app.component";
import { PollListComponent } from "./polls/poll-list/poll-list.component";
import { PollComponent } from "./polls/poll/poll.component";
import { NewPollComponent } from "./polls/new-poll/new-poll.component";
import { LoginComponent } from "./users/login/login.component";

import { GlobalErrorHandler } from "./shared/global-error-handler";

import { PollService } from "./polls/shared/poll.service";
import { UserService } from "./users/shared/user.service";

import { HttpAuthInterceptorService } from "./shared/http-auth-interceptor.service";

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
    HttpInterceptorModule,
    FacebookModule.forRoot(),
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [ 
    PollService, 
    UserService,
    HttpAuthInterceptorService,
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler
    }
  ],
  bootstrap: [ AppComponent ],
})
export class AppModule { }
