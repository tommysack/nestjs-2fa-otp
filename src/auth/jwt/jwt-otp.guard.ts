import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtOtpGuard extends AuthGuard('jwt-otp') {}



