import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { Location } from "@angular/common";
import "rxjs/add/operator/switchMap";

import { FacebookService, FBShareComponent, UIParams, UIResponse } from "ngx-facebook";

import { environment } from "./../../../environments/environment";
import { Poll, Option, User, Message } from "./../../shared/models";
import { PollService, OptionService, UserService, MessageService } from "./../../shared/services";

@Component ({
  selector: "poll",
  templateUrl: "./poll.component.html",
  styleUrls: ["./poll.component.scss"]
})
export class PollComponent implements OnInit {
  poll: Poll;  
  options: Option[];
  constructor(
    private pollService: PollService,
    private optionService: OptionService,
    private userService: UserService,
    private messageService: MessageService,
    private faceBookService: FacebookService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  pollChanged: boolean = false;
  currentUser: User;
  attemptingDelete: boolean = false;

  loggedIn(): boolean {
    return Object.keys(this.currentUser).length !== 0;
  }

  userOwnsPoll(): boolean {
    return this.currentUser.id === this.poll.userId;
  }

  ngOnInit(): void {
    this.getPoll();
    this.getOptions();

    this.userService.currentUser.subscribe(
      (user: User) => {
        this.currentUser = user;
      }
    );

    this.faceBookService.init({
      appId: environment.fbAppId,
      version: 'v2.9'
    });
  }

  populate() {
    this.getPoll();
    this.getOptions();
  }

  getPoll() {
    this.route.paramMap
    .switchMap((params: ParamMap) => 
      this.pollService.getPoll(+params.get("id")))
        .subscribe(
          poll => this.poll = poll
        );
  }

  getOptions() {
    this.route.paramMap
    .switchMap((params: ParamMap) => 
      this.optionService.getOptions(+params.get("id")))
        .subscribe(
          options => this.options = options
        );
  }

  attemptDelete() {
    this.attemptingDelete = true;
  }

  deletePoll(pollId: number) {
    this.pollService.deletePoll(pollId)
      .subscribe(
        data => this.router.navigateByUrl("/")
      )
  }

  encodeStringForUrl(string: string) {
    return string.replace(/\s/g, "%20");
  }

  makeTwitterShareLink() {
    let pollTitle = this.encodeStringForUrl(this.poll.title);
    let pageUrl = this.getPageUrl();
    return `https://twitter.com/intent/tweet?text=${pollTitle}%20Vote%20here:%20${pageUrl}`;
  }

  makeEmailLink() {
    let pollTitle = this.encodeStringForUrl(this.poll.title);
    let pageUrl = this.getPageUrl();
    return `mailto:?subject=${pollTitle}&amp;body=Vote%20here:%20${pageUrl}`
  }

  getPageUrl() {
    return `https://voto.loewe.pm${this.router.url}`;
  }

  shareOnFacebook() {
    const options: UIParams = {
      method: 'share',
      href: this.getPageUrl()
    };
    this.faceBookService.ui(options)
    .catch(this.handleError.bind(this));
  }

  handleError(error) {
    this.messageService.setMessage(new Message(0, "Something went wrong"));
  }

}