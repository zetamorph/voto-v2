import { Component, OnInit } from "@angular/core";
import { Poll } from "./poll";
import { PollService } from "./poll.service";

@Component ({
  selector: "poll-detail",
  templateUrl: "./poll-detail.component.html"
})
export class PollDetailComponent implements OnInit {
  poll: Poll;  
  constructor(
    private pollService: PollService
  ) {}

  getPoll(pollId) {
    this.pollService.getPoll(pollId)
      .subscribe(
        poll => this.poll = poll,
        err => console.error(err)
      )
  }

  ngOnInit(): void {
    this.getPoll(1);
  }

}