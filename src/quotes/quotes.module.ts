import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { Quote } from './quote.entity';
import { QuotesService } from './quotes.service';

@Module({
  providers: [QuotesService, UsersService],
  exports: [QuotesService],
  imports: [
    TypeOrmModule.forFeature([Quote]),
    TypeOrmModule.forFeature([User]),
  ],
})
export class QuotesModule {}
