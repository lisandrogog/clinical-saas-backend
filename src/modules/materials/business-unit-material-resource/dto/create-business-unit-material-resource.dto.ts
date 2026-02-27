import { IsNumber, IsOptional, IsUUID } from 'class-validator';

export class CreateBusinessUnitMaterialResourceDto {
  @IsUUID()
  materialResourceId: string;

  @IsNumber()
  quantity: number;

  @IsOptional()
  @IsNumber()
  quantityAvailable?: number = 0;

  @IsOptional()
  @IsNumber()
  quantityReserved?: number = 0;
}
