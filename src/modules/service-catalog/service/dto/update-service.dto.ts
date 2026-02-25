import { CreateServiceDto } from './create-service.dto';
import { IsBoolean, IsOptional } from 'class-validator';
import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { DtoI18nKeys } from '../constants/i18n.constants';

export class UpdateServiceDto extends PartialType(CreateServiceDto) {
  @ApiPropertyOptional({
    description: DtoI18nKeys.isActive,
    example: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  active?: boolean = true;
}
