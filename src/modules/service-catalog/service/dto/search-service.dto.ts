import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsUUID } from 'class-validator';
import { BaseSearchPaginationDto } from '@modules/utils/dto';
import { DtoI18nKeys as ServiceCategoryDtoI18nKeys } from '@modules/service-catalog/service-category/constants/i18n.constants';

export class SearchServiceDto extends BaseSearchPaginationDto {
  @ApiPropertyOptional({
    description: ServiceCategoryDtoI18nKeys.serviceCategoryIds,
    example: ['uuid1', 'uuid2'],
    required: false,
  })
  @IsUUID('all', { each: true })
  @IsOptional()
  serviceCategoryIds?: string[];
}
