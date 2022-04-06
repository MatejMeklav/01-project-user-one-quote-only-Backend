import { Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { QuotesService } from 'src/quotes/quotes.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { UsersService } from './users.service';
@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private quoteService: QuotesService,
  ) {}
  @Get('/:id')
  async getUserandQuote(@Param() params) {
    console.log('dddddddddddddddd');
    const user = await this.usersService.findById(params.id);
    if (!user) {
      return { notFound: 'user not found' };
    }
    const quote = await this.quoteService.findQuoteWithUser(user);
    if (!quote) {
      return {
        id: null,
        description: null,
        upVote: null,
        downVote: null,
        user: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          id: user.id,
        },
      };
    }
    return {
      id: quote.id,
      description: quote.description,
      upVote: quote.upVote,
      downVote: quote.downVote,
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        id: user.id,
      },
    };
  }
  @UseGuards(JwtAuthGuard)
  @Put('/:id/upvote')
  async upVoteQuote(@Param() params) {
    const user = await this.usersService.findById(params.id);
    return await this.quoteService.updateQuoteVotes(true, user);
  }
  @UseGuards(JwtAuthGuard)
  @Put('/:id/downvote')
  async downVoteQuote(@Param() params) {
    const user = await this.usersService.findById(params.id);
    return await this.quoteService.updateQuoteVotes(false, user);
  }
}
