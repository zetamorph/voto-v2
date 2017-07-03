import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { AppRoutingModule } from "./app-routing.module";
import { HttpInterceptorModule } from "ng-http-interceptor";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from "@angular/flex-layout";
import { FacebookModule } from "ngx-facebook";
import { ChartModule } from "angular2-chartjs";
import { NgSemanticModule } from "ng-semantic/ng-semantic";
import { AppComponent } from './app.component';
import { PollsComponent } from "./polls.component";
import { PollDetailComponent } from "./poll-detail.component";
import { ChartComponent } from "./chart.component";
import { LoginComponent } from "./login.component";
import { PollService } from "./poll.service";

@NgModule({
  declarations: [
    AppComponent,
    PollsComponent,
    PollDetailComponent,
    LoginComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    FlexLayoutModule,
    NgSemanticModule,
    //HttpInterceptorModule,
    FacebookModule.forRoot(),
    ChartModule,
    AppRoutingModule
  ],
  providers: [ PollService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
