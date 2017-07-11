import { Component, OnInit, ElementRef, ViewChild, Renderer } from '@angular/core';
import { Router, NavigationStart } from "@angular/router";

import { Message } from "./../../models/message.model";
import { MessageType } from "./../../types/message-type.enum";
import { MessageService } from "./../../services/message.service";

@Component({
  selector: 'flash',
  templateUrl: './flash.component.html',
  styleUrls: ['./flash.component.scss']
})
export class FlashComponent implements OnInit {
  @ViewChild("flashContainer") flashContainer: ElementRef;
  currentMessage: Message = new Message();
  messageHeader: string;
  isError: boolean = false;
  isWarning: boolean = false;
  isSuccess: boolean = false;
  messageClass: object = {
    "negative": this.isError,
    "warning": this.isWarning,
    "positive": this.isSuccess
  };

  constructor(
    private messageService: MessageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.messageService.currentMessage
    .subscribe(
      message => this.handleMessage(message)
    );

    this.router.events
    .filter(event => event instanceof NavigationStart)
    .subscribe((event:NavigationStart) => {
      this.hideMessage();
    });
  }

  showMessage() {
    this.flashContainer.nativeElement.style.display = "block";
  }

  hideMessage() {
    this.flashContainer.nativeElement.style.display = "none";
  }

  handleMessage(message: Message) {
    this.currentMessage = message;
    if(message.text !== undefined) {
      this.setMessageType(message.type);
      this.showMessage();
    }
  }

  setMessageType(messageType: MessageType) {
    this.isError = false;
    this.isWarning = false;
    this.isSuccess = false;

    switch(messageType) {
      case MessageType.ErrorMessage: 
        this.isError = true;
        this.messageHeader = "There was an error";
        break;
      case MessageType.Warning:
        this.isWarning = true;
        this.messageHeader = "Caution"
        break;
      case MessageType.Success: 
        this.isSuccess = true;
        this.messageHeader = "Success!";
        break;
    }
  }

}
