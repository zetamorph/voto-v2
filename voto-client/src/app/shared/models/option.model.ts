export class Option {
  constructor(
    public id: number,
    public title: string,
    public userId: number,
    public voteCount: number = 0,
  ) {}
}