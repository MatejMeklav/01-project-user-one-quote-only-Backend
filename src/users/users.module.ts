import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quote } from 'src/quotes/quote.entity';
import { QuotesService } from 'src/quotes/quotes.service';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  providers: [UsersService, QuotesService],
  controllers: [UsersController],
  exports: [UsersService],
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Quote]),
  ],
})
export class UsersModule {}
