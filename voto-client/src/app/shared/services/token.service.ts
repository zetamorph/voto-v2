import { Injectable } from "@angular/core";

@Injectable()
export class TokenService {
  getToken(): string {
    return window.localStorage.getItem("jwt");
  }

  setToken(token: string): void {
    window.localStorage.setItem("jwt", token);
  }

  deleteToken(): void {
    window.localStorage.removeItem("jwt");
  }
}