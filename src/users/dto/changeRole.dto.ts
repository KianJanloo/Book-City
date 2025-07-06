import { IsEnum, IsNotEmpty } from 'class-validator';

export class ChangeRoleDto {
  @IsNotEmpty()
  @IsEnum(['admin', 'user'])
  role: string;
}
