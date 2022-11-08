import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy } from 'passport-custom';
import { UserService } from '../user/user.service';
import { ConfigService } from '@nestjs/config';
import { AuthException } from '../exceptions/auth.exception';
import { authenticator } from 'otplib';

@Injectable()
export class OtpStrategy extends PassportStrategy(Strategy, 'otp') {

  constructor(
    private userService: UserService,
    private configService: ConfigService    
  ) {
    super();
  }

  async validate(payload: any) {    
    if (!authenticator.check(payload.body.otp, this.configService.get("OTP_LOGIN_KEY"))) {
      throw new AuthException("The otp is not valid");
    }
    const user = await this.userService.findUser({username: payload.user.username, otp: payload.body.otp});
    if (user == null) {
      throw new AuthException("The user and otp was not found");
    }
    //Otp exists: however unset it
    this.userService.updateUser({username: user['username']}, {otp: null});

    //Check if otp is expired    
    if (!(authenticator.timeRemaining() > 0)) {
      throw new AuthException("The otp is expired");
    }
    return {userId: payload.sub, username: payload.user.username};
  }

}

