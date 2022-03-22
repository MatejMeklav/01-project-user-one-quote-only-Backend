import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './users/auth/auth.service';
import { LocalAuthGuard } from './users/auth/local-auth.guard';

@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
    private appService: AppService,
    ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  login(@Request() req): any {
    return this.authService.login(req.user);
  }
}
