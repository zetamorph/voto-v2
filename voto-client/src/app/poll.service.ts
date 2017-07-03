import { Injectable } from "@angular/core";
import { Headers, Http } from "@angular/http";
import { HttpInterceptor } from "ng-http-interceptor";
import { Poll } from "./poll";
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class PollService {
  constructor(private http: Http) {}
  apiURL = "http://localhost:8000/";

  getPolls() {
    return this.http.get(this.apiURL + "polls")
      .map(res => res.json());
  }

  getPoll(pollId) {
    return this.http.get(this.apiURL + "polls/" + pollId)
      .map(res => res.json());
  }
}