import { IsString } from "class-validator";

export class ValidateEmailDto {

  @IsString()
  username: string;

  @IsString()
  emailCode: string;
  
}