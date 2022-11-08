import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { JwtOtpGuard } from 'src/auth/jwt/jwt-otp.guard';
import { LocalGuard } from 'src/auth/local/local.guard';
import { OtpGuard } from 'src/auth/otp/otp.guard';

export function Signin(guard: string) {
  switch(guard) {
    case('login'):
      return applyDecorators(        
        UseGuards(LocalGuard)
      );
    case('validate'): 
      return applyDecorators(
        UseGuards(JwtOtpGuard, OtpGuard)
      );
  }  
}