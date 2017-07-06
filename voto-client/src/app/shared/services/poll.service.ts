import { Injectable } from "@angular/core";
import { URLSearchParams } from "@angular/http";
import { Params } from "@angular/router";
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

  getPolls(query?: Params): Observable<Poll[]> {
    
    let params: URLSearchParams = new URLSearchParams();
    Object.keys(query).forEach((key) => {
      params.set(key, query[key]);
    });

    console.log(params.toString());
  
    return this.apiService.get("polls", params);

  }

  getPoll(pollId: number): Observable<Poll> {
    return this.apiService.get(`polls/${pollId}`);
  }
  
  postPoll(pollTitle: string): Observable<Poll> {
    return this.apiService.post("polls", {title: pollTitle});
  }

  deletePoll(pollId: number) {
    return this.apiService.delete(`polls/${pollId}`)
  }

}
  