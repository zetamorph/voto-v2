import { Injectable } from "@angular/core";
import { Headers, Http } from "@angular/http";
import { Option } from "./option";
import { Observable } from "rxjs/Rx";

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class OptionService {
  constructor(
    private http: Http
  ) {}
  apiUrl = "http://localhost:8000/";

  getOptions(pollId: number): Observable<Option[]> {
    return this.http.get(this.apiUrl + `polls/${pollId}/options`)
      .map(res => res.json());
  }

  postOption(optionTitle: string, pollId: number): Observable<Option> {
    return this.http.post(`${this.apiUrl}polls/${pollId}/options`, {title: optionTitle})
      .map(res => res.json());
  }
}