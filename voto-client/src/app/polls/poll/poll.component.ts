import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { Location } from "@angular/common";
import "rxjs/add/operator/switchMap";

import { Poll, Option } from "./../../shared/models";
import { PollService, OptionService } from "./../../shared/services";

@Component ({
  selector: "poll",
  templateUrl: "./poll.component.html"
})
export class PollComponent implements OnInit {
  poll: Poll;  
  options: Option[];
  constructor(
    private pollService: PollService,
    private optionService: OptionService,
    private router: Router,
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

  deletePoll(pollId: number) {
    this.pollService.deletePoll(pollId)
      .subscribe(
        data => this.router.navigateByUrl("/"),
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