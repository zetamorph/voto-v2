import { User } from "./user.model";

describe("User", () => {
  let user: User;

  beforeEach(() => {
    user = new User(1, "dormouse", "dormouse@cat.com");
  });

  it("has an id", () => {
    expect(user.id).toBe(1);
  });

  it("has a username", () => {
    expect(user.username).toBe("dormouse");
  });

  it("has an email", () => {
    expect(user.email).toBe("dormouse@cat.com");
  });

});