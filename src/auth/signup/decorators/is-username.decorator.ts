import { registerDecorator, ValidationOptions } from "class-validator";
import { IsUsernameRule } from "../validators/is-username-rule.validator";

export function IsUsername(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsUsername',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsUsernameRule
    });
  };
}