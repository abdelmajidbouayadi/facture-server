import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entity/user.model';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

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
        return { id: user._id };
      }
    }
    return null;
  }

  login(user: any) {
    const payload = user;
    return {
      access_token: this.jwtService.sign(payload),
      
    };
  }
}
