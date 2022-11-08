import { Module } from "@nestjs/common";
import { InjectConnection, MongooseModule } from "@nestjs/mongoose";
import { Connection } from "mongoose";
import { IsPasswordRule } from "../signup/validators/is-password-rule.validation";
import { IsUsernameRule } from "../signup/validators/is-username-rule.validator";
import { UserSchema } from "./user.schema";
import { UserService } from "./user.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: 'User', schema: UserSchema}      
    ])    
  ],
  controllers: [],
  providers: [UserService, IsUsernameRule, IsPasswordRule],
  exports: [UserService]
})
export class UserModule {
  
  constructor(@InjectConnection() private connection: Connection) {}

  async onModuleInit() {
    await this.connection.collection('users').createIndex({username: 1}, {unique: true});
  }
}