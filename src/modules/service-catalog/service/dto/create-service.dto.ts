import { BaseCodeNameDto } from '@modules/utils/dto/base-code-name.dto';
import { IsUUID, IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class CreateServiceDto extends BaseCodeNameDto {
  @IsUUID()
  serviceCategoryId: string;

  @IsNumber()
  basePrice: number;

  @IsNumber()
  baseCost: number;

  @IsBoolean()
  @IsOptional()
  active?: boolean = true;
}
