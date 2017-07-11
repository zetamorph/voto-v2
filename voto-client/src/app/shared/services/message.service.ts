import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Router, NavigationStart } from "@angular/router";
import "rxjs/add/operator/filter";

import { Message } from "./../models";

@Injectable()
export class MessageService {
  private currentMessageSubject = new BehaviorSubject<Message>(new Message());
  public currentMessage = this.currentMessageSubject.asObservable().distinctUntilChanged();
  constructor(private router: Router) { 
    
    router.events.filter(event => event instanceof NavigationStart)
    .subscribe(
      (event: NavigationStart) => {
        // purge the message on each page change
        this.clearMessage();
      }
    );
    
  }

  setMessage(message: Message) {
    this.currentMessageSubject.next(message);
  }

  getCurrentMessage(): Message {
    return this.currentMessageSubject.value;
  }

  clearMessage(): void {
    this.currentMessageSubject.next(new Message());
  }

}
