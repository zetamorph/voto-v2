import { Observable } from "rxjs";
import { Params } from "@angular/router";
import "rxjs/observable/from";
import "rxjs/observable/empty";

import { PollService, ApiService } from "./";

describe("Service: PollService", () => {

  let apiService: ApiService;
  let pollService: PollService;

  beforeEach(() => {
    apiService = new ApiService(null, null);
    pollService = new PollService(apiService);
  });

  describe("getPolls", () => {
    let spy: any;

    beforeEach(() => {
      spy = spyOn(apiService, "get").and.callFake(() => {
        return Observable.empty();
      });
    })

    it("should call the apiService to get a list of polls", () => {
      pollService.getPolls();
      
      expect(spy).toHaveBeenCalled();
    });

    it("should call the apiService with query parameters to get a list of polls ", () => {
      let query: Params;
      query = {
        sort: "random"
      };

      pollService.getPolls(query);
      
      expect(spy).toHaveBeenCalled();
    });

  });
  
  it("should call the apiService to get a single poll", () => {
    let spy = spyOn(apiService, "get").and.callFake(() => {
      return Observable.empty();
    });
    
    pollService.getPoll(1);
    
    expect(spy).toHaveBeenCalled();
  });

  it("should call the apiService to post a new poll", () => {
    let spy = spyOn(apiService, "post").and.callFake(() => {
      return Observable.empty();
    });
    
    pollService.postPoll("What is your favorite poll?");
    
    expect(spy).toHaveBeenCalled();
  });

  it("should call the apiService to delete a poll", () => {
    let spy = spyOn(apiService, "delete").and.callFake(() => {
      return Observable.empty();
    });
    
    pollService.deletePoll(1);
    
    expect(spy).toHaveBeenCalled();
  });

});
