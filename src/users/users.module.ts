import { Module } from '@nestjs/common';
import { QuotesService } from 'src/quotes/quotes.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  providers: [UsersService, QuotesService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
