import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from "./user.schema";
import { Model } from 'mongoose';
import { UserRegisterDto } from "../signup/dto/user-register.dto";

@Injectable()
export class UserService {

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) { }

  public async insertUser(userRegisterDto: UserRegisterDto): Promise<User> {   
    const userDoc = new this.userModel(userRegisterDto);
    userDoc.save();
    return userDoc;
  }

  public findUser(filter): Promise<User> {
    return this.userModel.findOne(filter).exec();
  }

  public async updateUser(filter, data): Promise<User> {
    await this.userModel.updateOne(filter, data).exec();
    return this.userModel.findOne(filter).exec();
  }   

}