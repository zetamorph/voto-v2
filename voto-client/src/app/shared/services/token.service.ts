import { Injectable } from "@angular/core";

@Injectable()
export class TokenService {
  getToken(): string {
    return window.localStorage.getItem("jwt");
  }

  setToken(token: string): Promise<any> {
    window.localStorage.setItem("jwt", token);
    return Promise.resolve();
  }

  deleteToken(): Promise<any> {
    window.localStorage.removeItem("jwt");
    return Promise.resolve();
  }
}