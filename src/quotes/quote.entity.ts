import { User } from 'src/users/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
@Entity({
  orderBy: { upVote: 'DESC' },
})
export class Quote {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ nullable: true })
  description: string;
  @Column({ nullable: true })
  date: Date;
  @Column({ nullable: true })
  upVote?: number;
  @Column({ nullable: true })
  downVote?: number;
  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @ManyToMany(() => User, (user) => user.quotesUpVoted, {
    cascade: true,
  })
  @JoinTable()
  usersUpVoted: User[];

  @ManyToMany(() => User, (user) => user.quotesDownVoted, {
    cascade: true,
  })
  @JoinTable()
  usersDownVoted: User[];
}
