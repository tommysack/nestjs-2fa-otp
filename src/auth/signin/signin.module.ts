import { Module } from "@nestjs/common";
import { JwtOtpModule } from "../jwt/jwt-otp.module";
import { JwtAuthModule } from "../jwt/jwt-auth.module";
import { SigninController } from "./signin.controller";
import { SigninService } from "./signin.service";
import { LocalStrategy } from "../local/local.strategy";
import { OtpStrategy } from "../otp/otp.strategy";
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from "../user/user.schema";
import { UserService } from "../user/user.service";
import { NotifierModule } from "src/notifier/notifier.module";
import { UserModule } from "../user/user.module";


@Module({
  imports: [
    JwtOtpModule,
    JwtAuthModule,
    NotifierModule,
    UserModule
  ],
  controllers: [SigninController],
  providers: [SigninService, LocalStrategy, OtpStrategy]
})
export class SigninModule {}  