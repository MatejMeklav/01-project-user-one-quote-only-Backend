import {
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Body,
  Put,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUpdateQuoteDto } from './quotes/dto/create-update-quote-dto';
import { QuotesService } from './quotes/quotes.service';
import { AuthService } from './users/auth/auth.service';
import { JwtAuthGuard } from './users/auth/jwt-auth.guard';
import { LocalAuthGuard } from './users/auth/local-auth.guard';
import { CreateUpdateUserDto } from './users/dto/create-update-user-dto';
import { UpdateUserPasswordDto } from './users/dto/update-user-password-dto';
import { UsersService } from './users/users.service';

@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
    private appService: AppService,
    private usersService: UsersService,
    private quotesService: QuotesService,
  ) {}
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    const token = await Promise.resolve(this.authService.login(req.user));
    return { key: token };
  }

  @Post('signup')
  async signup(@Body() createUserDto: CreateUpdateUserDto) {
    if (
      (await this.usersService.checkPassword(
        createUserDto.password,
        createUserDto.repeatedPassword,
      )) == false
    )
      return { UserCreateResponse: 'password fields  must match!' };
    if ((await this.usersService.create(createUserDto)) == true) {
      return { UserCreateResponse: 'Success, user was created' };
    }
    return {
      UserCreateResponse: 'Failed, user with that email already exists',
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(@Request() req) {
    return this.usersService.findById(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('myquote')
  async postQuote(
    @Request() req,
    @Body() createUpdateQuoteDto: CreateUpdateQuoteDto,
  ) {
    createUpdateQuoteDto.user = req.user;
    return this.quotesService.createUpdate(createUpdateQuoteDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/me/update-password')
  async updatePassword(
    @Request() req,
    @Body() updateUserPassword: UpdateUserPasswordDto,
  ) {
    if (
      (await this.usersService.checkPassword(
        updateUserPassword.password,
        updateUserPassword.repeatedPassword,
      )) == false
    )
      return { UserCreateResponse: 'password fields  must match!' };
    return await this.usersService.update(updateUserPassword, req.user.email);
  }
}
