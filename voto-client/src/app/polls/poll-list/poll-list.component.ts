import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { Observable } from "Rxjs";
import 'rxjs/add/operator/toPromise';

import { Poll } from "./../../shared/models";
import { PollService } from "./../../shared/services";

import { SemanticItemComponent } from "ng-semantic/ng-semantic";

@Component ({
  selector: "poll-list",
  templateUrl: "./poll-list.component.html",
  styleUrls: ['./poll-list.component.scss']
})
export class PollListComponent implements OnInit {
  constructor(
    private pollService: PollService,
    private activatedRoute: ActivatedRoute
  ) {}

  @ViewChild("previousPageButton")
  previousPageButton: SemanticItemComponent;
  @ViewChild("nextPageButton")
  nextPageButton: SemanticItemComponent;

  pollsPerPage: number = 10;
  currentPage: number = 0;
  currentQuery: Params;
  firstPage() {
    return this.currentPage === 0;
  }
  lastPage: boolean = false;
  polls: Poll[];
  
  getPolls(query?: Params) {
    
    let offset: number = this.currentPage * this.pollsPerPage;
    /* Since query is frozen, we have to 
    reassign it to itself with additional properties 
    using Object.assign */
    query = Object.assign({}, query, {
      limit: this.pollsPerPage.toString(),
      offset: offset.toString()
    });
    this.pollService.getPolls(query)
    .subscribe(
      polls => this.polls = polls,
      err => console.error(err)
    );
    
    //check if more polls exist
    query.offset = offset + this.pollsPerPage;
    query.limit = 1;
    this.pollService.getPolls(query)
    .subscribe(
      polls => {
        if(polls.length === 0) {
          this.lastPage = true;
        } else {
          this.lastPage = false;
        }
      },
      err => console.error(err)
    );
  }

  ngOnInit(): void {
    /* subscribe to the query parameters so the component is updated 
    when the retireved polls for the params differ */
    this.activatedRoute.queryParams
    .subscribe(
      query => {
        this.currentQuery = query;
        this.currentPage = 0;
        this.getPolls(query);
      },
      err => console.error(err)
    );
  }

  changePage() {
    this.getPolls(this.currentQuery);
  }

  goToNextPage() {
    if(!this.lastPage) {
      this.currentPage += 1;
      this.changePage();
    }
  }

  goToPreviousPage() {
    if(!this.firstPage()) {
      this.currentPage -= 1;
      this.changePage();
    }
  }
}