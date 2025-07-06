import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @IsOptional()
  photos: string[];
  @IsNotEmpty()
  @IsString()
  description: string;
  @IsNotEmpty()
  @IsString()
  title: string;
  @IsNotEmpty()
  price: number;
  @IsNotEmpty()
  category: string;
  @IsNotEmpty()
  tags: string[];
  @IsNotEmpty()
  publisher: string;
  @IsNotEmpty()
  author: string;
  userId: number;
}
