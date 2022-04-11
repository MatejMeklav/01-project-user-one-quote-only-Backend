import { Injectable } from '@nestjs/common';
import { CreateUpdateUserDto } from './dto/create-update-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quote } from 'src/quotes/quote.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  async findOne(email: string): Promise<User | undefined> {
    const data = await this.usersRepository.findOne({
      email: email,
    });

    if (!data) {
      return undefined;
    }
    return data;
  }

  async findById(id: string): Promise<User | undefined> {
    const data = await this.usersRepository.findOne({
      id: id,
    });

    if (!data) {
      return undefined;
    }
    return data;
  }

  async checkPassword(
    password: string,
    repeatedPassword: string,
  ): Promise<true | false> {
    if (password != repeatedPassword) {
      return false;
    }
    return true;
  }

  async create(createUserDto: CreateUpdateUserDto): Promise<true | false> {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(createUserDto.password, salt);

    const data = await this.usersRepository.findOne({
      email: createUserDto.email,
    });
    if (!data) {
      const user = new User();
      user.email = createUserDto.email;
      user.firstName = createUserDto.firstName;
      user.lastName = createUserDto.lastName;
      user.password = hash;
      await this.usersRepository.save(user);
      return true;
    }
    return false;
  }

  async update(
    updateUserDto: UpdateUserDto,
    id: string,
  ): Promise<true | false> {
    const data = await this.usersRepository.findOne({
      id: id,
    });
    if (!data) {
      return false;
    }

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(updateUserDto.password, salt);
    data.password = hash;
    data.email = updateUserDto.email;
    data.firstName = updateUserDto.firstName;
    data.lastName = updateUserDto.lastName;
    await this.usersRepository.save(data);
    return true;
  }
}
