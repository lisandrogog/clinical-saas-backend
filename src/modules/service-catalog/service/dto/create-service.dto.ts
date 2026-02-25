import { BaseCodeNameDto } from '@modules/utils/dto/base-code-name.dto';
import { IsUUID, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { DtoI18nKeys } from '../constants/i18n.constants';
import { DtoI18nKeys as ServiceCategoryDtoI18nKeys } from '@modules/service-catalog/service-category/constants/i18n.constants';

export class CreateServiceDto extends BaseCodeNameDto {
  @ApiProperty({
    description: ServiceCategoryDtoI18nKeys.serviceCategoryId,
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: true,
  })
  @IsUUID()
  serviceCategoryId: string;

  @ApiProperty({
    description: DtoI18nKeys.basePrice,
    example: 30,
    required: true,
  })
  @IsNumber()
  basePrice: number;

  @ApiProperty({
    description: DtoI18nKeys.baseCost,
    example: 10,
    required: true,
  })
  @IsNumber()
  baseCost: number;

  @ApiProperty({
    description: DtoI18nKeys.duration,
    example: 40,
    required: true,
  })
  @IsNumber()
  duration: number;
}
