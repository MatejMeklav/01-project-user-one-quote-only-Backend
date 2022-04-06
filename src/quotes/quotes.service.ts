import { Injectable } from '@nestjs/common';
import { AppDataSource } from 'src/data-source';
import { User } from 'src/users/user.entity';
import { CreateUpdateQuoteDto } from './dto/create-update-quote-dto';
import { Quote } from './quote.entity';

@Injectable()
export class QuotesService {
  async findQuoteWithUser(user: User): Promise<Quote | undefined> {
    const quoteRepository = await AppDataSource.getRepository(Quote);
    const data = await quoteRepository.findOne({
      where: { user: user },
      relations: { user: true },
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
      quote.date = new Date();
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
  async getAllQuotesByPublishDate() {
    return await AppDataSource.getRepository(Quote).find({
      relations: {
        user: true,
      },
      order: {
        date: 'DESC',
      },
    });
  }

  async getRandomQuote() {
    const value = await AppDataSource.getRepository(Quote).count({});
    console.log(value + 'dddd');
    const random = Math.floor(Math.random() * value);
    return await AppDataSource.getRepository(Quote).find({
      relations: {
        user: true,
      },
      order: {
        upVote: 'DESC',
      },
      skip: random,
      take: 1,
    });
  }
}
