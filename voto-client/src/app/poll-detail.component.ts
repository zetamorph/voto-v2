import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Location } from "@angular/common";
import { Poll } from "./poll";
import { Option } from "./option";
import { PollService } from "./poll.service";
import { OptionService } from "./option.service";
import "rxjs/add/operator/switchMap";

@Component ({
  selector: "poll-detail",
  templateUrl: "./poll-detail.component.html"
})
export class PollDetailComponent implements OnInit {
  poll: Poll;  
  options: Option[];
  constructor(
    private pollService: PollService,
    private optionService: OptionService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  addOption(optionTitle) {
    this.optionService.postOption(optionTitle, this.poll.id)
      .subscribe(
        option => this.options.push(option),
        err => console.error(err)
      )
  }

  ngOnInit(): void {
    this.route.paramMap
    .switchMap((params: ParamMap) => 
      this.pollService.getPoll(+params.get("id")))
        .subscribe(
          poll => this.poll = poll,
          err => console.error(err)
        );

    this.route.paramMap
    .switchMap((params: ParamMap) => 
      this.optionService.getOptions(+params.get("id")))
        .subscribe(
          options => this.options = options,
          err => console.error(err)
        );
    }
}