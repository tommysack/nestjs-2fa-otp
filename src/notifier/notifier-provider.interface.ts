import { User } from "../auth/user/user.schema";

export interface INotifierProvider {
  
  sendNotification(text: string, options);

}