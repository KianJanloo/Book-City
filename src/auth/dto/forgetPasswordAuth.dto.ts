import { IsEmail, IsNotEmpty } from 'class-validator';

export class ForgetPasswordAuthDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
