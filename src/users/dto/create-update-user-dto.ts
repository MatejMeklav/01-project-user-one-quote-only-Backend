import { IsAlpha, IsEmail, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateUpdateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @MaxLength(15)
  @IsAlpha()
  firstName: string;
  @IsNotEmpty()
  @MaxLength(15)
  @IsAlpha()
  lastName: string;
  @IsNotEmpty()
  @MaxLength(20)
  password: string;
  @IsNotEmpty()
  @MaxLength(20)
  repeatedPassword: string;
}
