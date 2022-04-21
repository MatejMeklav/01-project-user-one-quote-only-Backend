import {
  Controller,
  Get,
  Param,
  Put,
  UseGuards,
  Request,
  Post,
} from '@nestjs/common';
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
  @Post('/:id/upvote')
  async upVoteQuote(@Request() req, @Param() params) {
    console.log(req.user.id);
    const user = await this.usersService.findById(req.user.id);
    const resUp = await this.quoteService.checkIfVoted(true, user, params.id);
    const resDown = await this.quoteService.checkIfVoted(
      false,
      user,
      params.id,
    );
    if (resUp) {
      return { voted: true };
    }
    if (resDown) {
      return { voted: true };
    }
    return await this.quoteService.quoteVote(true, user, params.id);
  }
  @UseGuards(JwtAuthGuard)
  @Put('/:id/downvote')
  async downVoteQuote(@Request() req, @Param() params) {
    const user = await this.usersService.findById(req.user.id);
    const resUp = await this.quoteService.checkIfVoted(true, user, params.id);
    const resDown = await this.quoteService.checkIfVoted(
      false,
      user,
      params.id,
    );
    if (resUp) {
      return { voted: true };
    } else if (resDown) {
      return { voted: true };
    } else {
      return this.quoteService.quoteVote(false, user, params.id);
    }
  }
}
