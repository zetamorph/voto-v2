import { Option } from "./option.model";

describe("Option", () => {

  let option: Option;

  beforeEach(() => {
    option = new Option(1, "cat", 1, 5);
  });

  it("has an id", () => {
    expect(option.id).toBe(1);
  });

  it("has a title", () => {
    expect(option.title).toBe("cat");
  });

  it("has a userId", () => {
    expect(option.userId).toBe(1);
  });

  it("has a voteCount", () => {
    expect(option.voteCount).toBe(5);
  });

  it("has voteCount 0 when no voteCount is given to the constructor", () => {
    option = new Option(1, "cat", 1);
    expect(option.voteCount).toBe(0);
  });

});