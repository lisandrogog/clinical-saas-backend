import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';
import { CreateServiceCategoryDto } from './create-service-category.dto';
import { DtoI18nKeys } from '../constants/i18n.constants';

export class UpdateServiceCategoryDto extends PartialType(
  CreateServiceCategoryDto,
) {
  @ApiPropertyOptional({
    description: DtoI18nKeys.isActive,
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  active?: boolean = true;
}
