import { BaseCodeDescriptionDto } from '@modules/utils/dto';
import { IsNumber, IsUUID } from 'class-validator';

export class CreateMaterialResourceDto extends BaseCodeDescriptionDto {
  @IsUUID()
  tenantId: string;

  @IsNumber()
  materialResourceTypeId: number;
}
