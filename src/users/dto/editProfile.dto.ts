import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class EditProfileDto {
  @IsString()
  @ApiProperty({ example: 'Joe', description: 'First name: string' })
  first_name: string;
  @IsString()
  @ApiProperty({ example: 'Jakson', description: 'Full name: string' })
  last_name: string;
  @IsString()
  @ApiProperty({ example: 'Joe-jakson', description: 'User name: string' })
  username: string;
  @IsString()
  @ApiProperty({
    example: 'example.png',
    description: 'Profile picture: string',
  })
  profilePicture: string;
}
