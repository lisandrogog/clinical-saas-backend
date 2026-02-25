import { IsNumber, IsOptional } from 'class-validator';
import { BaseCodeNameDto } from './base-code-name.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { DtoI18nKeys } from '../constants/i18n.constants';

export class BaseCodeDescriptionDto extends BaseCodeNameDto {
  @ApiPropertyOptional({ description: DtoI18nKeys.description })
  @IsOptional()
  description: string;

  @ApiPropertyOptional({ description: DtoI18nKeys.itemOrder })
  @IsOptional()
  @IsNumber()
  itemOrder: number;
}
