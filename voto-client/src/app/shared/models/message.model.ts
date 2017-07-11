import { MessageType } from "./../types";

export class Message {
  constructor(
    public type: MessageType = undefined, 
    public text: string = ""
  ) {}
}