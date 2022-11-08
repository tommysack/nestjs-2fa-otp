import { Module } from "@nestjs/common";
import { JwtModule } from '@nestjs/jwt';
import { JwtService } from '@nestjs/jwt';
import { JwtOtpStrategy } from "./jwt-otp.strategy";
import { ConfigModule, ConfigService } from "@nestjs/config";

export const JWT_OTP_PROVIDER = Symbol('JwtOtpService');

@Module({
  imports: [   
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (ConfigService) => {
        return {
          secret: ConfigService.get('JWT_OTP_KEY'),
          signOptions: {
            expiresIn: ConfigService.get('JWT_OTP_EXPIRATION_TIME'),
          }
        }
      },
      inject: [ConfigService]
    })
  ],
  providers: [
    {
      provide: JWT_OTP_PROVIDER,
      useExisting: JwtService
    },
    JwtOtpStrategy
  ],
  exports: [JWT_OTP_PROVIDER]
})
export class JwtOtpModule {}