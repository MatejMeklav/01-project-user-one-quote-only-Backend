import { Injectable } from '@nestjs/common';
import { AppDataSource } from 'src/data-source';
import { CreateUpdateUserDto } from './dto/create-update-user-dto';
import { UpdateUserPasswordDto } from './dto/update-user-password-dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  async findOne(email: string): Promise<User | undefined> {
    const userRepository = await AppDataSource.getRepository(User);
    const data = await userRepository.findOneBy({
      email: email,
    });

    if (!data) {
      return undefined;
    }
    return data;
  }

  async findById(id: string): Promise<User | undefined> {
    const userRepository = await AppDataSource.getRepository(User);
    const data = await userRepository.findOneBy({
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
    const userRepository = await AppDataSource.getRepository(User);
    const data = await userRepository.findOneBy({
      email: createUserDto.email,
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      password: createUserDto.password,
    });
    if (!data) {
      const user = new User();
      user.email = createUserDto.email;
      user.firstName = createUserDto.firstName;
      user.lastName = createUserDto.lastName;
      user.password = createUserDto.password;
      await userRepository.save(user);
      return true;
    }
    return false;
  }

  async update(
    updateUserPasswordDto: UpdateUserPasswordDto,
    email: string,
  ): Promise<true | false> {
    const userRepository = await AppDataSource.getRepository(User);
    const data = await userRepository.findOneBy({
      email: email,
    });
    if (!data) {
      return false;
    }
    data.password = updateUserPasswordDto.password;
    await userRepository.save(data);
    return true;
  }
}
