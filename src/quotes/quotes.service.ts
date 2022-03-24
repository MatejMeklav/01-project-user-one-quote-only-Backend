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
}
