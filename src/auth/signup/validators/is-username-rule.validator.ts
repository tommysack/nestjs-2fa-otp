import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

@ValidatorConstraint({ name: 'IsUsername', async: true })
@Injectable()
export class IsUsernameRule implements ValidatorConstraintInterface {

  constructor(private configService: ConfigService) { }

  async validate(username: string) {
    if (this.configService.get("USER_USERNAME_EREG") != "" && username.match(this.configService.get("USER_USERNAME_EREG")) == null) {
      return false;
    }
    return true;

  }

  defaultMessage(args: ValidationArguments) {
    return "User format is not valid";
  }
}