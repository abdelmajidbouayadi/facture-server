import { ConflictException, Injectable } from '@nestjs/common';
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
    try{
      await user.save()
    }catch(err){
      if((err.message as string).includes('E11000 duplicate key error') )
          throw new ConflictException('Email_Already_Exists');
          throw new ConflictException('unknown error');
    }
    return {name: user.name, email: user.email, _id: user._id }
  }
  async findOne(email: string): Promise<User | undefined> {
    return this.userModel.findOne({email}).exec();
  }

}
