import { IsEmail, IsNotEmpty } from 'class-validator';

export class ResetPasswordAuthDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  code: string;
  @IsNotEmpty()
  newPassword: string;
}
