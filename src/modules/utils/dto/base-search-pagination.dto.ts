import { IsOptional, IsInt, Min, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class BaseSearchPaginationDto {
  @ApiPropertyOptional({ description: 'search' })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ description: 'page', default: 1 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({
    description: 'limit',
    default: 10,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 10;
}
