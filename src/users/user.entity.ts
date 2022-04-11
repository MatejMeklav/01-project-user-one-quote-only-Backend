import { Quote } from 'src/quotes/quote.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  email: string;
  @Column()
  firstName: string;
  @Column()
  lastName: string;
  @Column()
  password: string;

  @ManyToMany(() => Quote, (quote) => quote.usersUpVoted)
  quotesUpVoted: Quote;

  @ManyToMany(() => Quote, (quote) => quote.usersDownVoted)
  quotesDownVoted: Quote;
}
