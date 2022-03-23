import { Injectable } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: '1',
      email: 'email',
      firstName: 'johnddd',
      lastName: 'lastnadddddme',
      password: '123123',
    },
    {
      id: '2',
      email: 'email2',
      firstName: 'john',
      lastName: 'lasssstname',
      password: 'pfpsdpfpdfpsd',
    },
  ];

  async findOne(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }
}
