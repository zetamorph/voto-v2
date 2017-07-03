import { Injectable } from "@angular/core";
import { Headers, Http } from "@angular/http";
import { HttpAuthInterceptorService } from "./http-interceptor.service";
import { Poll } from "./poll";
import { Option } from "./option";
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class PollService {
  constructor(
    private http: Http,
    private httpInterceptor: HttpAuthInterceptorService
  ) {}
  apiUrl = "http://localhost:8000/";

  getPolls(): Observable<Poll[]> {
    return this.http.get(this.apiUrl + "polls")
      .map(res => res.json());
  }

  getPoll(pollId: number): Observable<Poll> {
    return this.http.get(this.apiUrl + "polls/" + pollId)
      .map(res => res.json());
  }

  postOption(optionTitle: string, pollId: number): Observable<Option> {
    return this.http.post(`${this.apiUrl}polls/${pollId}/options`, {title: optionTitle})
      .map(res => res.json());
  }
  
  postPoll(pollTitle: string): Observable<Poll> {
    return this.http.post(`${this.apiUrl}polls`, {title: pollTitle})
      .map(res => res.json());
  }
  
}