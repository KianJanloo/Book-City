import { IsOptional, IsNumberString, IsEnum } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @IsNumberString()
  page?: number;

  @IsOptional()
  @IsNumberString()
  limit?: number;
}

export class OrderDto {
  @IsOptional()
  sort: string;
  @IsOptional()
  @IsEnum(['ASC', 'DESC'])
  order: 'ASC' | 'DESC';
}

export class SearchDto {
  @IsOptional()
  search: string;
}
