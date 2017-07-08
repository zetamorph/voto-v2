import { async, getTestBed, TestBed } from "@angular/core/testing";
import { Observable } from "rxjs";
import "rxjs/observable/from";
import "rxjs/observable/empty";

import { VoteService, ApiService } from "./";

describe("Service: VoteService", () => {

  let apiService: ApiService;
  let voteService: VoteService;

  beforeEach(() => {
    apiService = new ApiService(null, null);
    voteService = new VoteService(apiService);
  });

  it("should call the apiService to post a vote for a poll", () => {
    let spy = spyOn(apiService, "post").and.callFake(() => {
      return Observable.empty();
    });
    
    voteService.vote(1,1);
    
    expect(spy).toHaveBeenCalled();
  });

});
