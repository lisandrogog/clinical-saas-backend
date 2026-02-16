import { IsNumber, IsOptional } from 'class-validator';
import { BaseCodeNameDto } from './base-code-name.dto';

export class BaseCodeDescriptionDto extends BaseCodeNameDto {
  @IsOptional()
  description: string;

  @IsOptional()
  @IsNumber()
  itemOrder: number;
}
