import { registerDecorator, ValidationOptions } from "class-validator";
import { IsPasswordRule } from "../validators/is-password-rule.validation";

export function IsPassword(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsPassword',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsPasswordRule
    });
  };
}