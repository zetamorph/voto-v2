import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ApiService } from "./api.service";

@Injectable()
export class VoteService {
  constructor(
    private apiService: ApiService
  ) {}

  vote(pollId: number, optionId: number): Observable<any> {
    return this.apiService.post(`polls/${pollId}/options/${optionId}/votes`, {});
  }
}