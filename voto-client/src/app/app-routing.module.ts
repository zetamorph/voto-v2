import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { PollListComponent } from "./polls/poll-list/poll-list.component";
import { PollComponent } from "./polls/poll/poll.component";
import { NewPollComponent } from "./polls/new-poll/new-poll.component";
import { LoginComponent } from "./users/login/login.component";

const routes: Routes = [
  { path: "", redirectTo: "/polls", pathMatch: "full" },
  { path: "polls/new", component: NewPollComponent },
  { path: "polls/random", component: PollListComponent },
  { path: "polls/latest", component: PollListComponent },
  { path: "polls/:id", component: PollComponent },
  { path: "polls", component: PollListComponent },
  { path: "login", component: LoginComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}