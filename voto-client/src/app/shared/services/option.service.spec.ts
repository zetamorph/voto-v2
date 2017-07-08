import { Observable } from "rxjs";
import "rxjs/observable/from";
import "rxjs/observable/empty";

import { OptionService, ApiService } from "./";

describe("Service: OptionService", () => {

  let apiService: ApiService;
  let optionService: OptionService;

  beforeEach(() => {
    apiService = new ApiService(null, null);
    optionService = new OptionService(apiService);
  });

  it("should call the apiService to get a list of options for a poll", () => {
    let spy = spyOn(apiService, "get").and.callFake(() => {
      return Observable.empty();
    });
    
    optionService.getOptions(1)
    
    expect(spy).toHaveBeenCalled();
  });

  it("should call the apiService to post a new option for a poll", () => {
    let spy = spyOn(apiService, "post").and.callFake(() => {
      return Observable.empty();
    });
    
    optionService.postOption("cat", 1);
    
    expect(spy).toHaveBeenCalled();
  });

});
