import { Component, OnInit } from "@angular/core";
import { Poll } from "./poll";
import { PollService } from "./poll.service";

@Component ({
  selector: "polls",
  templateUrl: "./polls.component.html",
  styleUrls: ['./polls.component.scss']
})
export class PollsComponent implements OnInit {
  
  polls: Poll[];

  constructor(private pollService: PollService) {}

  getPolls() {
    this.pollService.getPolls()
      .subscribe(
        polls => this.polls = polls,
        err => console.error(err)
      )
  }

  ngOnInit(): void {
    this.getPolls();
  }
  
}