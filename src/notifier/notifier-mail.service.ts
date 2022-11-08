import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { User } from "../auth/user/user.schema";
import { INotifierProvider } from "./notifier-provider.interface";

@Injectable()
export class NotifierMailService implements INotifierProvider {
  
  constructor(
    private readonly mailerService: MailerService
  ){}

  public async sendNotification(text: string, options) {
    this.mailerService
      .sendMail({
        to: options.recipient,
        from: options.from,
        subject: options.subject,
        text: text
      })
      .then(() => {})
      .catch((e) => {});
  }  
  
}