import { IsEmail, IsNotEmpty, MATCHES, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @MaxLength(15)
  firstName: string;
  @IsNotEmpty()
  @MaxLength(15)
  lastName: string;
  @IsNotEmpty()
  @MaxLength(20)
  password: string;
  @IsNotEmpty()
  @MaxLength(20)
  repeatedPassword: string;
}
