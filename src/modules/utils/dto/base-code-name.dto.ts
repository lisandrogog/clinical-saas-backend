import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { DtoI18nKeys } from '../constants/i18n.constants';

export class BaseCodeNameDto {
  @ApiProperty({
    description: DtoI18nKeys.code,
    example: '',
    required: true,
  })
  @IsString()
  code: string;

  @ApiProperty({
    description: DtoI18nKeys.name,
    example: '',
    required: true,
  })
  @IsString()
  name: string;
}
