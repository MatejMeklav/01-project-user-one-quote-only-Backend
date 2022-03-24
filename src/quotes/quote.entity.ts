import { User } from 'src/users/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
@Entity()
export class Quote {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  description: string;
  @Column({ nullable: true })
  upVote?: number;
  @Column({ nullable: true })
  downVote?: number;
  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
