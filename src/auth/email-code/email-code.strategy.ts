import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy } from 'passport-custom';
import { UserService } from '../user/user.service';
import { User } from '../user/user.schema';
import { AuthException } from '../exceptions/auth.exception';

@Injectable()
export class EmailCodeStrategy extends PassportStrategy(Strategy, 'email-code') {

  constructor(private userService: UserService) {
    super();
  }

  async validate(payload: any): Promise<User> { 
    const user = await this.userService.findUser({username: payload.body.username});
    if (user == null) {
      throw new AuthException("The user was not found");
    }
    if (typeof user['emailCode'] == "undefined" || user['emailCode'] != payload.body.emailCode) {
      throw new AuthException("The email is invalid");
    }
    return user;
  }

}

