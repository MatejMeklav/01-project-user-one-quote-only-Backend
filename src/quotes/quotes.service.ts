import { Injectable } from '@nestjs/common';
import { AppDataSource } from 'src/data-source';
import { User } from 'src/users/user.entity';
import { CreateUpdateQuoteDto } from './dto/create-update-quote-dto';
import { Quote } from './quote.entity';

@Injectable()
export class QuotesService {
  async findQuoteWithUser(user: User): Promise<Quote | undefined> {
    const quoteRepository = await AppDataSource.getRepository(Quote);
    const data = await quoteRepository.findOneBy({
      user: user,
    });

    return data;
  }

  async createUpdate(
    createUpdateQuoteDto: CreateUpdateQuoteDto,
  ): Promise<Quote | null> {
    const quoteRepository = await AppDataSource.getRepository(Quote);
    const data = await this.findQuoteWithUser(createUpdateQuoteDto.user);
    if (!data) {
      const quote = new Quote();
      quote.description = createUpdateQuoteDto.description;
      quote.user = createUpdateQuoteDto.user;
      quote.downVote = 0;
      quote.upVote = 0;
      await quoteRepository.save(quote);
      return quote;
    }
    data.description = createUpdateQuoteDto.description;
    await quoteRepository.save(data);
    return data;
  }

  async updateQuoteVotes(option: boolean, user: User) {
    const data = await this.findQuoteWithUser(user);
    if (!data) {
      return { error: 'not found' };
    }
    if (option) {
      data.upVote = data.upVote + 1;
    } else {
      data.downVote = data.downVote + 1;
    }
    const quoteRepository = await AppDataSource.getRepository(Quote);
    await quoteRepository.save(data);
    return data;
  }
  async getAllQuotes() {
    return await AppDataSource.getRepository(Quote).find({
      relations: {
        user: true,
      },
      order: {
        upVote: 'DESC',
      },
    });
  }
}
