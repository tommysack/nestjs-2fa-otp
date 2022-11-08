import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { SigninModule } from '../auth/signin/signin.module';
import { SignupModule } from "../auth/signup/signup.module";

@Module({
  imports: [
    ConfigModule.forRoot({      
      isGlobal: true,      
      envFilePath: `${process.cwd()}/config/env/${process.env.NODE_ENV}.env`      
    }), 
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (ConfigService) => ({
        uri: ConfigService.get('MONGO_CONNECTION_DB')
      }),
      inject: [ConfigService]
    }), 
    SigninModule,
    SignupModule   
  ]
})
export class AppModule {}
