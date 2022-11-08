import { Inject, Injectable } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { INotifierProvider } from "src/notifier/notifier-provider.interface";
import { NOTIFIER_PROVIDER } from "src/notifier/notifier.module";
import { JWT_AUTH_PROVIDER } from "../jwt/jwt-auth.module";
import { JWT_OTP_PROVIDER } from "../jwt/jwt-otp.module";
import { User } from "../user/user.schema";
import { UserService } from "../user/user.service";
import { authenticator } from 'otplib';
import { ConfigService } from "@nestjs/config";

@Injectable()
export class SigninService {  

  constructor(
    @Inject(JWT_OTP_PROVIDER) private jwtOtpService: JwtService,
    @Inject(JWT_AUTH_PROVIDER) private jwtAuthService: JwtService,
    @Inject(NOTIFIER_PROVIDER) private notifierService: INotifierProvider,
    private userService: UserService,
    private configService: ConfigService
  ) {}

  public async getJwtOtp(user: User) {    
    const otp = authenticator.generate(this.configService.get('OTP_LOGIN_KEY'));
    const data = {otp: otp};
    const userUpdated = await this.userService.updateUser({username: user['username']}, data);
    const textNotification = this.configService.get("NOTIFICATION_OTP_TEXT").replace("USERNAME", user['username']).replace("OTP", user['otp']);
    const optionsNotification = {
      recipient: user['email'],
      from: this.configService.get("NOTIFICATION_OTP_FROM"),
      subject: this.configService.get("NOTIFICATION_OTP_SUBJECT")
    };
    this.notifierService.sendNotification(textNotification,optionsNotification); 
    return {
      jwt_otp: this.jwtOtpService.sign({username: user.username, sub: user._id})
    };
  }

  public getJwtAuth(user: User) {
    return {
      jwt_auth: this.jwtAuthService.sign({username: user.username, sub: user._id})
    };
  }  
}
