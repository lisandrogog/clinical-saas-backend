import { IsOptional, IsInt, Min, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { DtoI18nKeys } from '../constants/i18n.constants';

export class BaseSearchPaginationDto {
  @ApiPropertyOptional({ description: DtoI18nKeys.search })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ description: DtoI18nKeys.page, default: 1 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({
    description: DtoI18nKeys.limit,
    default: 10,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 10;
}
