import { Module } from "@nestjs/common";
import { SignupController } from "./signup.controller";
import { SignupService } from "./signup.service";
import { UserModule } from "../user/user.module";
import { NotifierModule } from "src/notifier/notifier.module";
import { EmailCodeStrategy } from "../email-code/email-code.strategy";

@Module({
  imports: [
    NotifierModule,
    UserModule
  ],
  controllers: [SignupController],
  providers: [EmailCodeStrategy, SignupService]
})
export class SignupModule {

}