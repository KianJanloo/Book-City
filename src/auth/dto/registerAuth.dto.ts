import { IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterAuthDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  password: string;
  @IsNotEmpty()
  username: string;
}
