import { TokenService } from "./";

describe("Service: TokenService", () => {
  let service: TokenService;
  let store: Object;

  beforeEach(() => {

    store = {};

    spyOn(window.localStorage, "getItem").and.callFake((key) => {
      return store[key];
    });

    spyOn(window.localStorage, "setItem").and.callFake((key, value) => {
      return store[key] = value;
    });

    spyOn(window.localStorage, "removeItem").and.callFake((key) => {
      delete store[key];
      return store;
    });

    service = new TokenService();

  });

  it("gets the token from the jwt property in localStorage", () => {
    store["jwt"] = "testToken";
    
    const result = service.getToken();

    expect(result).toBe("testToken");
  });

  it("sets the jwt property of localStorage to the token", () => {
    service.setToken("testToken");

    expect(store["jwt"]).toBe("testToken");
  });

  it("removes the jwt property of localStorage", () => {
    store["jwt"] = "testToken";
    
    service.deleteToken();

    expect(store.hasOwnProperty("jwt")).toBe(false);
  });

})