import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entity/user.model';
import { Constants } from 'src/comun/constants';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel : Model<User>){}

  async register(createUserDto: CreateUserDto){
    const {password, ...rest} = createUserDto;
    const hash = await bcrypt.hash(password, Constants.saltOrRounds);
    const user =new this.userModel({hash, ...rest});
    return user.save();
  }
  async findOne(email: string): Promise<User | undefined> {
    return this.userModel.findOne({email}).exec();
  }

}
