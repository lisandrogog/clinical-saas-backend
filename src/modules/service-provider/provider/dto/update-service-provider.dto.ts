import { PartialType } from '@nestjs/mapped-types';
import { CreateServiceProviderDto } from './create-service-provider.dto';
import { IsBoolean, IsOptional } from 'class-validator';
import { DtoI18nKeys } from '../constants/i18n.constants';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateServiceProviderDto extends PartialType(
  CreateServiceProviderDto,
) {
  @ApiPropertyOptional({
    description: DtoI18nKeys.isActive,
    example: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  active?: boolean;
}
