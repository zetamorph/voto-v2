import { Injectable } from "@angular/core";
import { Headers, Http } from "@angular/http";
import { Poll } from "./poll.model";
import { Option } from "./option.model";
import { Observable } from 'rxjs/Rx';
import { HttpAuthInterceptorService } from "./../../shared/http-auth-interceptor.service";

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

export interface Query {
  [key: string] : any;
}

@Injectable()
export class PollService {
  constructor(
    private http: Http,
    private authInterceptor: HttpAuthInterceptorService
  ) {}
  apiUrl = "http://localhost:8000/";

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
    return this.http.get(this.apiUrl + "polls/" + pollId)
      .map(res => res.json());
  }
  
  postPoll(pollTitle: string): Observable<Poll> {
    return this.http.post(`${this.apiUrl}polls`, {title: pollTitle})
      .map(res => res.json());
  }

  deletePoll(pollId: number): Observable<Response> {
    return this.http.delete(`${this.apiUrl}polls/${pollId}`)
      .map(res => res.json());
  }

  getOptions(pollId: number): Observable<Option[]> {
    return this.http.get(this.apiUrl + `polls/${pollId}/options`)
      .map(res => res.json());
  }

  postOption(optionTitle: string, pollId: number): Observable<Option> {
    return this.http.post(`${this.apiUrl}polls/${pollId}/options`, {title: optionTitle})
      .map(res => res.json());
  }
}
  