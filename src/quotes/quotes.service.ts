import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { CreateUpdateQuoteDto } from './dto/create-update-quote-dto';
import { Quote } from './quote.entity';

@Injectable()
export class QuotesService {
  constructor(
    @InjectRepository(Quote)
    private quotesRepository: Repository<Quote>,
  ) {}
  async findQuoteWithUser(user: User): Promise<Quote | undefined> {
    const data = await this.quotesRepository.findOne({
      where: { user: user },
      relations: ['user'],
    });

    return data;
  }

  async findQuoteWithId(id: string): Promise<Quote | undefined> {
    const data = await this.quotesRepository.findOne({
      where: { id: id },
    });

    return data;
  }

  async createUpdate(
    createUpdateQuoteDto: CreateUpdateQuoteDto,
  ): Promise<Quote | null> {
    const data = await this.findQuoteWithUser(createUpdateQuoteDto.user);
    if (!data) {
      const quote = new Quote();
      quote.description = createUpdateQuoteDto.description;
      quote.user = createUpdateQuoteDto.user;
      quote.downVote = 0;
      quote.upVote = 0;
      quote.date = new Date();
      await this.quotesRepository.save(quote);
      return quote;
    }
    data.description = createUpdateQuoteDto.description;
    await this.quotesRepository.save(data);
    return data;
  }

  async getAllQuotes() {
    return await this.quotesRepository.find({
      relations: ['user'],
      order: {
        upVote: 'DESC',
      },
    });
  }

  async quoteVote(type: boolean, user: User, quoteId: string) {
    const quote = await this.findQuoteWithId(quoteId);
    if (type) {
      quote.usersUpVoted = new Array<User>();
      quote.usersUpVoted.push(user);
      quote.upVote = quote.upVote + 1;
    } else {
      if (quote.usersDownVoted === null) {
        quote.usersDownVoted = new Array<User>();
      }
      quote.usersDownVoted.push(user);
      quote.downVote = quote.downVote + 1;
    }
    await this.quotesRepository.save(quote);
    return quote;
  }
  async getAllQuotesByPublishDate() {
    return await this.quotesRepository.find({
      relations: ['user'],
      order: {
        date: 'DESC',
      },
    });
  }

  async getRandomQuote() {
    const value = await this.quotesRepository.count({});
    const random = Math.floor(Math.random() * value);
    return await this.quotesRepository.find({
      relations: ['user'],
      order: {
        upVote: 'DESC',
      },
      skip: random,
      take: 1,
    });
  }
}
