import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Poll } from "./../../shared/models";
import { PollService } from "./../../shared/services";

@Component ({
  selector: "new-poll",
  templateUrl: "./new-poll.component.html",
  styleUrls: ["./new-poll.component.scss"]
})
export class NewPollComponent {
  
  constructor(
    private pollService: PollService,
    private router: Router) {}

  addPoll(title: string) {
    this.pollService.postPoll(title)
    .subscribe(
      newPoll => this.router.navigateByUrl(`/polls/${newPoll.id}`),
      error => {}
    ); 
  }
  
}