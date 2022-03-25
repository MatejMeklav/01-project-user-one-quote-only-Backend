import { Module } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { QuotesService } from './quotes.service';

@Module({
  providers: [QuotesService, UsersService],
  exports: [QuotesService],
})
export class QuotesModule {}
