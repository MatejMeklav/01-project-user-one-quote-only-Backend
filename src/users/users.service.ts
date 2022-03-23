import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
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

  async findById(id: string): Promise<User | undefined> {
    return this.users.find((user) => user.id === id);
  }

  async create(createUserDto: CreateUserDto): Promise<true | false> {
    //preverjanje po poizvedbi na bazo
    const user: User = {
      id: '2',
      email: createUserDto.email,
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      password: createUserDto.password,
    };
    this.users.push(user);
    return true;
  }
}
