import { IsBoolean, IsEmail, IsOptional, IsUUID } from 'class-validator';

export class CreateBusinessUnitDto {
  @IsUUID()
  tenantId: string;

  businessName: string;

  code: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  phone?: string;

  @IsOptional()
  address?: string;

  @IsOptional()
  @IsBoolean()
  active?: boolean;
}
