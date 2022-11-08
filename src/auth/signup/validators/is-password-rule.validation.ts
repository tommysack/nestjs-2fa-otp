import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

@ValidatorConstraint({ name: 'IsPassword', async: true })
@Injectable()
export class IsPasswordRule implements ValidatorConstraintInterface {

  constructor(private configService: ConfigService) { }

  async validate(password: string) {
    if (this.configService.get("USER_PASSWORD_EREG") != "" && password.match(this.configService.get("USER_PASSWORD_EREG")) == null) {
      return false;
    }
    return true;

  }

  defaultMessage(args: ValidationArguments) {
    return "Password format is not valid";
  }
}