import { IsNumber, IsOptional } from 'class-validator';
import { BaseCodeNameDto } from './base-code-name.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class BaseCodeDescriptionDto extends BaseCodeNameDto {
  @ApiPropertyOptional({ description: 'description' })
  @IsOptional()
  description: string;

  @ApiPropertyOptional({ description: 'itemOrder' })
  @IsOptional()
  @IsNumber()
  itemOrder: number;
}
