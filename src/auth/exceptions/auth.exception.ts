import {HttpException, HttpStatus} from "@nestjs/common";

export class AuthException extends HttpException {  

  constructor(message: string) {
    super(message, HttpStatus.UNAUTHORIZED);
  }
  
}