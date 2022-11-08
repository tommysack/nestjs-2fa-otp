import { IsEmail, IsString } from "class-validator";
import { IsPassword } from "../decorators/is-password.decorator";
import { IsUsername } from "../decorators/is-username.decorator";

export class UserRegisterDto {

  @IsString()
  name: string;

  @IsString()
  surname: string;

  @IsEmail()
  emailTemp: string;

  @IsUsername()
  username: string;

  @IsPassword()
  password: string;
  
}