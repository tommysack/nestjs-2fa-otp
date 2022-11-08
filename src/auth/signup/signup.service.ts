import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { INotifierProvider } from "src/notifier/notifier-provider.interface";
import { NOTIFIER_PROVIDER } from "src/notifier/notifier.module";
import { User } from "../user/user.schema";
import { UserService } from "../user/user.service";
import { UserRegisterDto } from "./dto/user-register.dto";
import { UserUpdateDto } from "./dto/user-update.dto";
import { ValidateEmailDto } from "./dto/validate-email.dto";
import * as bcrypt from 'bcrypt';
import { authenticator } from 'otplib';
import { ConfigService } from "@nestjs/config";
import { AuthException } from "../exceptions/auth.exception";

@Injectable()
export class SignupService {

  constructor(
    @Inject(NOTIFIER_PROVIDER) private notifierService: INotifierProvider,
    private userService: UserService,
    private configService: ConfigService
  ){}

  public async register(userRegisterDto: UserRegisterDto) {
    userRegisterDto['username'] = userRegisterDto['username'].toLowerCase();
    const userExisting = await this.userService.findUser({username: userRegisterDto['username']}); 
    if (userExisting != null) {
      throw new AuthException("The username already exists");
    }
    userRegisterDto['password'] = await bcrypt.hash(userRegisterDto['password'], parseInt(this.configService.get('USER_PASSWORD_ROUNDS')));
    userRegisterDto['createdTime'] = Math.floor(Date.now() / 1000);
    userRegisterDto['emailCode'] = authenticator.generate(this.configService.get('EMAILCODE_REGISTER_KEY'));
    const user = await this.userService.insertUser(userRegisterDto);
    const textNotification = this.configService.get("NOTIFICATION_EMAILCODE_TEXT").replace("USERNAME", user['username']).replace("EMAIL_CODE", user['emailCode']);
    const optionsNotification = {
      recipient: user['emailTemp'],
      from: this.configService.get("NOTIFICATION_EMAILCODE_FROM"),
      subject: this.configService.get("NOTIFICATION_EMAILCODE_SUBJECT")
    };
    this.notifierService.sendNotification(textNotification,optionsNotification); 
  }

  public async validateEmail(validateEmailDto: ValidateEmailDto) {
    const user = await this.userService.findUser({username: validateEmailDto.username});
    if (user == null) {
      throw new AuthException("The user was not found");
    }
    const emailTemp = user['emailTemp'];    
    const userUpdated = await this.userService.updateUser({username: validateEmailDto.username}, {email: emailTemp, emailTemp: null, emailCode: null});
    const textNotification = this.configService.get("NOTIFICATION_EMAIL_ISVALID_TEXT").replace("###USERNAME###", userUpdated['username']);
    const optionsNotification = {
      recipient: userUpdated['email'],
      from: this.configService.get("NOTIFICATION_EMAIL_ISVALID_FROM"),
      subject: this.configService.get("NOTIFICATION_EMAIL_ISVALID_SUBJECT")
    };
    this.notifierService.sendNotification(textNotification,optionsNotification); 
  }

  public async update(username: string, userUpdateDto: UserUpdateDto) {
    let fieldsUpdateUser = {};
    if (typeof userUpdateDto['name'] != "undefined") {
      fieldsUpdateUser['name'] = userUpdateDto['name'];
    }
    if (typeof userUpdateDto['surname'] != "undefined") {
      fieldsUpdateUser['surname'] = userUpdateDto['surname'];
    }
    if (typeof userUpdateDto['emailTemp'] != "undefined") {
      fieldsUpdateUser['emailTemp'] = userUpdateDto['emailTemp'];
      fieldsUpdateUser['emailCode'] = authenticator.generate(this.configService.get('EMAILCODE_REGISTER_KEY'));
      fieldsUpdateUser['email'] = null;
    }
    if (typeof userUpdateDto['password'] != "undefined") {
      fieldsUpdateUser['password'] = await bcrypt.hash(userUpdateDto['password'], parseInt(this.configService.get('USER_PASSWORD_ROUNDS')));
    }
    const user = await this.userService.updateUser({username: username}, fieldsUpdateUser);
    if (typeof userUpdateDto['emailTemp'] != "undefined") {
      const textNotification = this.configService.get("NOTIFICATION_EMAILCODE_FROM").replace("USERNAME", username).replace("EMAIL_CODE", user['emailCode']);
      const optionsNotification = {
        recipient: user['emailTemp'],
        from: this.configService.get("NOTIFICATION_EMAILCODE_FROM"),
        subject: this.configService.get("NOTIFICATION_EMAILCODE_SUBJECT")
      };
      this.notifierService.sendNotification(textNotification,optionsNotification); 
    }
  }
}