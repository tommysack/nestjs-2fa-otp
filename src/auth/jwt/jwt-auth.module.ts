import { Module } from "@nestjs/common";
import { JwtModule } from '@nestjs/jwt';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthStrategy } from "./jwt-auth.strategy";
import { ConfigModule, ConfigService } from "@nestjs/config";

export const JWT_AUTH_PROVIDER = Symbol('JwtAuthService');

@Module({
  imports: [      
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (ConfigService) => {
        return {
          secret: ConfigService.get('JWT_AUTH_KEY'),
          signOptions: {
            expiresIn: ConfigService.get('JWT_AUTH_EXPIRATION_TIME'),
          }
        }
      },
      inject: [ConfigService],
    })
  ],
  providers: [
    {
      provide: JWT_AUTH_PROVIDER,
      useExisting: JwtService
    },
    JwtAuthStrategy
  ],
  exports: [JWT_AUTH_PROVIDER],
})
export class JwtAuthModule {}