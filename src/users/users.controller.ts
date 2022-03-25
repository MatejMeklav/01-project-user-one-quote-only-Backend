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
    const user = await this.usersService.findById(params.id);
    if (!user) {
      return { notFound: 'user not found' };
    }
    const quote = await this.quoteService.findQuoteWithUser(user);
    if (!quote) {
      return {
        firstName: user.firstName,
        lastname: user.lastName,
        description: null,
        upVote: null,
        downVote: null,
      };
    }
    return {
      firstName: user.firstName,
      lastname: user.lastName,
      description: quote.description,
      upVote: quote.upVote,
      downVote: quote.downVote,
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
