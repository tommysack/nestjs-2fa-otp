import { Controller, Post, Req } from "@nestjs/common";
import { SigninService } from "./signin.service";
import { Signin } from "./decorators/signin.decorator";

@Controller('signin')
export class SigninController {

  constructor(
    private signinService: SigninService
  ){}

  @Post('/login')
  @Signin('login')//check credentials and email valid exists
  getJwtOtp(@Req() req) {
    return this.signinService.getJwtOtp(req.user);//generate/notify otp, and return jwtOpt    
  }
  
  @Post('/validate')
  @Signin('validate')//check jwtOtp and otp
  getJwtAuth(@Req() req) {
    return this.signinService.getJwtAuth(req.user);//generate jwtAuth (in Controller must use @UseGuards(JwtAuthGuard))
  }

}