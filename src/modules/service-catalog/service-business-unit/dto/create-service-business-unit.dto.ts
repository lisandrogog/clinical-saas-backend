import { IsBoolean, IsNumber, IsOptional, IsUUID } from 'class-validator';

export class CreateServiceBusinessUnitDto {
  @IsUUID()
  serviceId: string;

  @IsUUID()
  businessUnitId: string;

  @IsOptional()
  @IsNumber()
  price?: number = 0;

  @IsOptional()
  @IsNumber()
  cost?: number = 0;

  @IsOptional()
  @IsBoolean()
  active?: boolean = true;

  @IsOptional()
  extraData?: Record<string, any>;
}
