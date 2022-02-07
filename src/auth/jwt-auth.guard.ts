import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';
import { jwtConstants } from './constants';
import { Strategy as JwtStrategy } from 'passport-jwt';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { Request, request, Response } from 'express';
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor() {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    this.validityToken(context)
    return true;
  }

  validityToken(context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest();
    if (request.url.includes('api/')) {
      const token = request.headers.authorization?.replace('Bearer ', '');
      let service = new JwtService({});
      if (!token) throw  new UnauthorizedException();
      try {
          //  this methode verify two thing validity of token an date experation
          const decode: { iat: number; exp: number } = service.verify(token, {
            secret: jwtConstants.secret,
          });
        } catch (e) {
          console.log(e);
          throw new UnauthorizedException();
      }
    }
  }
}
