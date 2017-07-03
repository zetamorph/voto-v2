import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { PollsComponent } from "./polls.component";
import { PollDetailComponent } from "./poll-detail.component";
import { NewPollComponent } from "./new-poll.component";
import { LoginComponent } from "./login.component";

const routes: Routes = [
  { path: "", redirectTo: "/polls", pathMatch: "full" },
  { path: "polls/new", component: NewPollComponent },
  { path: "polls/:id", component: PollDetailComponent },
  { path: "polls", component: PollsComponent },
  { path: "login", component: LoginComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}