import { Component, Input, Output, EventEmitter } from "@angular/core";

import { Option, VoteService, OptionService } from "./../../../../shared";

@Component({
  selector: "poll-option-list",
  templateUrl: "./poll-option-list.component.html",
  styleUrls: ["poll-option-list.component.scss"]
})
export class PollOptionListComponent {
  constructor(
    private voteService: VoteService,
    private optionService: OptionService
  ) {}
  @Input() options: Option[];
  @Input() pollId: number;
  @Input() loggedIn: boolean;
  @Output() pollChange = new EventEmitter<boolean>();
  
  voteOnOption(optionId: number) {
    this.voteService.vote(this.pollId, optionId)
    .subscribe(
      data => {
        this.pollChange.emit(true);
      }
    )
  }

  addOption(optionTitle: string) {
    this.optionService.postOption(optionTitle, this.pollId)
    .subscribe(
      option => this.options.push(option)
    )
  }

}
