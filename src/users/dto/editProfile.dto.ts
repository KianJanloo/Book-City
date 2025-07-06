import { IsString } from 'class-validator';

export class EditProfileDto {
  @IsString()
  first_name: string;
  @IsString()
  last_name: string;
  @IsString()
  username: string;
  @IsString()
  profilePicture: string;
}
