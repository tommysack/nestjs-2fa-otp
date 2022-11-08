import { Body, Controller, Post, Req, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { UserRegisterDto } from "./dto/user-register.dto";
import { UserUpdateDto } from "./dto/user-update.dto";
import { SignupService } from "./signup.service";
import { EmailCodeGuard } from "../email-code/email-code.guard";
import { ValidateEmailDto } from "./dto/validate-email.dto";
import { JwtAuthGuard } from "../jwt/jwt-auth.guard";

@Controller('signup')
export class SignupController {

  constructor(private signupService: SignupService){}

  @Post('/register')
  @UsePipes()
  register(@Body() userRegisterDto: UserRegisterDto) {    
    return this.signupService.register(userRegisterDto);//register and send notitify
  }

  @Post('/validate-email')
  @UseGuards(EmailCodeGuard)
  validateEmail(@Body() validateEmailDto: ValidateEmailDto) {
    this.signupService.validateEmail(validateEmailDto);//cut emailTemp in email, unset emailCode and send notify
  }

  @Post('/update')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({whitelist: true, forbidNonWhitelisted: true}))
  update(@Req() req, @Body() userUpdateDto: UserUpdateDto) {
    return this.signupService.update(req.user.username, userUpdateDto);
  }

} 
