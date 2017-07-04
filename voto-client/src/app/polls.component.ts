import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { Observable } from "Rxjs";
import 'rxjs/add/operator/toPromise';
import { Poll } from "./poll";
import { PollService } from "./poll.service";

@Component ({
  selector: "polls",
  templateUrl: "./polls.component.html",
  styleUrls: ['./polls.component.scss']
})
export class PollsComponent implements OnInit {
  constructor(
    private pollService: PollService,
    private activatedRoute: ActivatedRoute
  ) {}

  polls: Poll[];
  
  getPolls(query?: object) {

    this.pollService.getPolls(query)
    .subscribe(
      polls => this.polls = polls,
      err => console.error(err)
    );
  }

  ngOnInit(): void {
    /* subscribe to the query parameters so the component is updated 
    when the retireved polls for the params differ */
    this.activatedRoute.queryParams
    .subscribe(
      query => this.getPolls(query),
      err => console.error(err)
    );
  }
  
}