import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsUUID } from 'class-validator';
import { BaseSearchPaginationDto } from '@modules/utils/dto';

export class SearchServiceDto extends BaseSearchPaginationDto {
  @ApiPropertyOptional({
    description: 'serviceCategoryIds',
    example: ['uuid1', 'uuid2'],
    required: false,
  })
  @IsUUID('all', { each: true })
  @IsOptional()
  serviceCategoryIds?: string[];
}
