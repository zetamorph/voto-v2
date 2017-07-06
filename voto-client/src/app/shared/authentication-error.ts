export class AuthenticationError extends Error {
  
  constructor() {
    super();
    this.message = "Please log in first";
    this.name = "AuthenticationError";
  }

}