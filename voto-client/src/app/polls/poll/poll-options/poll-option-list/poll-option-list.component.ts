import { Component, Input, Output, EventEmitter } from "@angular/core";

import { Option, VoteService } from "./../../../../shared";

@Component({
  selector: "poll-option-list",
  templateUrl: "./poll-option-list.component.html",
  styleUrls: ["./poll-option-list.component.scss"]
})
export class PollOptionListComponent {
  constructor(
    private voteService: VoteService
  ) {}
  @Input() options: Option[];
  @Output() pollChange = new EventEmitter<boolean>();

  voteOnOption(pollId: number, optionId: number) {
    this.voteService.vote(pollId, optionId)
    .subscribe(
      data => {
        console.log("voted");
        this.pollChange.emit(true);
      });
  }

}
