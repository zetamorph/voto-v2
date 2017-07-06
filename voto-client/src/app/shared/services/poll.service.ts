import { Injectable } from "@angular/core";
import { URLSearchParams } from "@angular/http";
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ApiService } from "./api.service";
import { Poll } from "./../models";

@Injectable()
export class PollService {
  constructor(
    private apiService: ApiService
  ) {}

  getPolls(query?: Query): Observable<Poll[]> {
    let queryString: string = "";
    if(Object.keys(query).length !== 0) {
      queryString = "?" + Object.keys(query)
        .map(param => param + "=" + query[param] + "&")
        .reduce((acc, val) => acc + val);
    }
    queryString = queryString.slice(0, queryString.length - 1);
    return this.http.get(this.apiUrl + "polls" + queryString)
      .map(res => res.json());
  }

  getPoll(pollId: number): Observable<Poll> {
    return this.apiService.get(`polls/${pollId}`);
  }
  
  postPoll(pollTitle: string): Observable<Poll> {
    return this.apiService.post("polls", {title: pollTitle});
  }

  delete(pollId: number) {
    return this.apiService.delete(`${this.apiUrl}polls/${pollId}`)
  }

}
  