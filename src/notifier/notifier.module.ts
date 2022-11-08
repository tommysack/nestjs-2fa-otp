import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { NotifierMailService } from './notifier-mail.service';

export const NOTIFIER_PROVIDER = Symbol('INotifierProvider');

@Module({
  imports: [    
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (ConfigService) => ({
        transport: {
          host: ConfigService.get('MAIL_TRANSPORT_HOST'),
          port: ConfigService.get('MAIL_TRANSPORT_PORT'),
          ignoreTLS: true,
          secure: true,
          auth: {
            type: ConfigService.get('MAIL_TRANSPORT_AUTH_TYPE'),
            user: ConfigService.get('MAIL_TRANSPORT_AUTH_USER'),
            clientId: ConfigService.get('MAIL_TRANSPORT_AUTH_CLIENTID'),
            clientSecret: ConfigService.get('MAIL_TRANSPORT_AUTH_CLIENTSECRET'),
            refreshToken: ConfigService.get('MAIL_TRANSPORT_AUTH_REFRESHTOKEN'),
          },
        },
        defaults: {
          from: ConfigService.get('MAIL_FROM'),
        }  
      }),
      inject: [ConfigService]
    }) 
  ],  
  providers: [
    {
      provide: NOTIFIER_PROVIDER,
      useClass: NotifierMailService
    }
  ],
  exports: [NOTIFIER_PROVIDER]
})
export class NotifierModule {}  