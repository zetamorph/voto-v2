import { Injectable } from "@angular/core";

@Injectable()
export class TokenService {
  getToken(): string {
    return window.localStorage.jwt;
  }

  setToken(token: string): void {
    window.localStorage.jwt = token;
  }

  deleteToken(): void {
    window.localStorage.deleteItem("jwt");
  }
}