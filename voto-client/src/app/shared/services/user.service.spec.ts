import { Observable } from "rxjs";
import "rxjs/observable/from";
import "rxjs/observable/empty";

import { UserService, TokenService, ApiService } from "./";

describe("Service: UserService", () => {

  let apiService: ApiService;
  let userService: UserService;
  let tokenService: TokenService;

  beforeEach(() => {
    tokenService = new TokenService();
    apiService = new ApiService(null, tokenService);
    userService = new UserService(apiService, tokenService);
  });

  it("should call the apiService to post a new user", () => {
    let apiServiceSpy = spyOn(apiService, "post").and.callFake(() => {
      return Observable.from([{ token: "abcdefgh" }]);
    });
    let tokenServiceSpy = spyOn(tokenService, "setToken").and.callFake(() => {});
    userService.signup("fbToken");
    
    expect(apiServiceSpy).toHaveBeenCalled();
    expect(tokenServiceSpy).toHaveBeenCalled();
  });

  it("should call the tokenService to log a user out", () => {
    let spy = spyOn(tokenService, "deleteToken").and.callFake(() => {});
    
    userService.logout();
    
    expect(spy).toHaveBeenCalled();
  });

});
