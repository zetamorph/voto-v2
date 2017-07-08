import { Poll } from "./poll.model";

describe("Poll", () => {

  let poll: Poll;

  beforeEach(() => {
    poll = new Poll(1, "Question", 5)
  })

  it("has an id", () => {
    expect(poll.id).toBe(1);
  });

  it("has a title", () => {
    expect(poll.title).toBe("Question");
  });

  it("has a userId", () => {
    expect(poll.userId).toBe(5);
  });

});
