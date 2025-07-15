import { IsNotEmpty } from 'class-validator';

export class CreateContactDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  message: string;
}
