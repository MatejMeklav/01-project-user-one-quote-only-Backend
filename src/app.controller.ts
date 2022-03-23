import {
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  CacheKey,
  Body,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './users/auth/auth.service';
import { JwtAuthGuard } from './users/auth/jwt-auth.guard';
import { LocalAuthGuard } from './users/auth/local-auth.guard';
import { CreateUserDto } from './users/dto/create-user-dto';
import { User } from './users/user.entity';
import { UsersService } from './users/users.service';

@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
    private appService: AppService,
    private usersService: UsersService,
  ) {}
  @CacheKey('AuthToken')
  @Get()
  async getHello(): Promise<string> {
    return await Promise.resolve(this.appService.getAuthToken('AuthToken'));
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    const token = await Promise.resolve(this.authService.login(req.user));
    return { key: token };
  }

  @Post('signup')
  signup(@Body() createUserDto: CreateUserDto) {
    if (this.usersService.create(createUserDto)) {
      return { UserCreateResponse: 'Success' };
    }
    return { UserCreateResponse: 'Failed' };
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(@Request() req) {
    return this.usersService.findById(req.user.id);
  }
}
