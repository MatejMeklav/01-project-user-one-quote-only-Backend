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
import { UpdateUserDto } from './users/dto/update-user-dto';
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
    console.log(token + ' token');
    console.log(process.env.DATABASE_PASSWORD);
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
    console.log(req.user.id);
    const user = await this.usersService.findById(req.user.id);
    console.log(user.id + 'dddd');
    return await this.quotesService.findQuoteWithUser(user);
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
  @Put('/me/update-user')
  async updatePassword(@Request() req, @Body() updateUser: UpdateUserDto) {
    if (
      (await this.usersService.checkPassword(
        updateUser.password,
        updateUser.repeatedPassword,
      )) == false
    )
      return { UserCreateResponse: 'password fields  must match!' };
    return await this.usersService.update(updateUser, req.user.id);
  }

  @Get('list')
  async getQuotesUsers() {
    return await this.quotesService.getAllQuotes();
  }

  @Get('list/random')
  async getQuoteUserRandom() {
    return await this.quotesService.getRandomQuote();
  }

  @Get('list/date')
  async getQuotesUsersByDate() {
    return await this.quotesService.getAllQuotesByPublishDate();
  }
}
