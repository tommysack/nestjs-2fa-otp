import { IsEmail, IsInt, IsOptional, IsString, Min } from "class-validator";

export class UserUpdateDto {

  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  surname: string;

  @IsEmail()
  @IsOptional()
  emailTemp: string;  

  @IsString()
  @IsOptional()
  password: string;
  
}