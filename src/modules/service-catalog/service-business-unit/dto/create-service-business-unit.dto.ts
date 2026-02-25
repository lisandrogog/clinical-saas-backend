import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsUUID } from 'class-validator';
import { DtoI18nKeys as ServiceDtoI18nKeys } from '@modules/service-catalog/service/constants/i18n.constants';
import { DtoI18nKeys as BusinessUnitDtoI18nKeys } from '@modules/organization/business-unit/constants/i18n.constants';
import { DtoI18nKeys } from '../constants/i18n.constants';

export class CreateServiceBusinessUnitDto {
  @ApiProperty({
    description: ServiceDtoI18nKeys.serviceId,
    example: 'uuid',
    required: true,
  })
  @IsUUID()
  serviceId: string;

  @ApiProperty({
    description: BusinessUnitDtoI18nKeys.businessUnitId,
    example: 'uuid',
    required: true,
  })
  @IsUUID()
  businessUnitId: string;

  @ApiPropertyOptional({
    description: DtoI18nKeys.price,
    example: 30,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  price?: number;

  @ApiPropertyOptional({
    description: DtoI18nKeys.cost,
    example: 10,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  cost?: number;

  @ApiPropertyOptional({
    description: DtoI18nKeys.duration,
    example: 40,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  duration?: number;

  @ApiPropertyOptional({
    description: DtoI18nKeys.extraData,
    example: { key: 'value' },
    required: false,
  })
  @IsOptional()
  extraData?: Record<string, any>;
}
