import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entity/user.model';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, passwordTest: string) {
    const user = await this.usersService.findOne(email);
    if (user) {
      const isMatch = await bcrypt.compare(passwordTest, user.hash);
      if (isMatch) {
        return { 
            email: user.email,
            id: user._id };
      }
    }
    return null;
  }

  login(user: any) {
    const payload = user;
    return {
      ...payload,
      expiresIn: jwtConstants.expiresInSecond,
      _token: this.jwtService.sign(payload),
      
    };
  }
}
