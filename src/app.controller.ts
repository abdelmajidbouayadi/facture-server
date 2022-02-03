import { Controller, Get, UseGuards, Request, Post, Res } from '@nestjs/common';
import { Response, response } from 'express';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGard } from './auth/local-auth.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
  ) {}
  @UseGuards(LocalAuthGard)
  @Post('login')
  getHello(@Request() req: any) {
    return this.authService.login(req.user);
  }
  
  @UseGuards(JwtAuthGuard)
  @Get('protected')
  getProtected(@Request() req: any) {
    return req.user;
  }
}
