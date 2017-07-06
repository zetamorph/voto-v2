import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ApiService } from "./api.service";
import { Option } from "./../models";

@Injectable()
export class OptionService {
  constructor(
    private apiService: ApiService
  ) {}

  getOptions(pollId: number): Observable<Option[]> {
    return this.apiService.get(`polls/${pollId}/options`);
  }

  postOption(optionTitle: string, pollId: number): Observable<Option> {
    return this.apiService.post(`polls/${pollId}/options`, {title: optionTitle});
  }
}