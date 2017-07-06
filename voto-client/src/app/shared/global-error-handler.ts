import { ErrorHandler, Injectable } from "@angular/core";

import { AuthenticationError } from "./authentication-error";

@Injectable()
export class GlobalErrorHandler extends ErrorHandler {
  constructor() {
    super(false);
  }

  handleError(error: Error) : void {
    switch (error.name) {
      /* If the user isn´t logged in, set a global error message 
       * and redirect to /login */
      case "AuthenticationError": {
        console.log("authenticationError");
        return;
      }
      default: {
        super.handleError(error);
      }
    }
    
    /*
    else {
      super.handleError(error);
    }
    Pass the error along to Angular´s generic ErrorHandler */
    
  }
}