import { BaseCodeNameDto } from '@modules/utils/dto/base-code-name.dto';
import { IsNumber, IsOptional } from 'class-validator';

/**
 * generic tripe: {code, name}
 */
export class CreateIdentificationTypeDto extends BaseCodeNameDto {
  @IsOptional()
  @IsNumber()
  itemOrder?: number = 0;
}
