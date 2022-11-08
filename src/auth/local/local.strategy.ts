import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { User } from "../user/user.schema";
import { UserService } from "../user/user.service";
import * as bcrypt from 'bcrypt';
import { AuthException } from '../exceptions/auth.exception';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

  constructor(private userService: UserService) {

    super({
      usernameField: 'username'
    });

  }

  async validate(username: string, password: string): Promise<User> {  
    username = username.toLowerCase();
    const user = await this.userService.findUser({username: username});
    if (user == null) {
      throw new AuthException("The user was not found");
    }
    const passwordMatch = await bcrypt.compare(password, user['password']);
    if (!passwordMatch) {
      throw new AuthException("The password is invalid");
    }
    if (typeof user['email'] == "undefined") {
      throw new AuthException("The email has not yet been validated");
    }
    return user;
  }
}