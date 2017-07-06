import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { Location } from "@angular/common";
import "rxjs/add/operator/switchMap";

import { Poll } from "./../shared/poll.model";
import { Option } from "./../shared/option.model";
import { PollService } from "./../shared/poll.service";
import { AuthenticationError } from "./../../shared/authentication-error";

@Component ({
  selector: "poll",
  templateUrl: "./poll.component.html"
})
export class PollComponent implements OnInit {
  poll: Poll;  
  options: Option[];
  constructor(
    private pollService: PollService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  addOption(optionTitle) {
    throw new AuthenticationError();
    
    /*
    this.pollService.postOption(optionTitle, this.poll.id)
      .subscribe(
        option => this.options.push(option),
        err => console.error(err)
      )
    */
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
      this.pollService.getOptions(+params.get("id")))
        .subscribe(
          options => this.options = options,
          err => console.error(err)
        );
    }
}