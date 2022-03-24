import { IsNotEmpty } from 'class-validator';
import { User } from 'src/users/user.entity';

export class CreateUpdateQuoteDto {
  @IsNotEmpty()
  description: string;
  upVotes?: number;
  downVotes?: number;
  user: User;
}
