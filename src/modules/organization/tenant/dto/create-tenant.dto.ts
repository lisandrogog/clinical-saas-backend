import { IsEmail, IsOptional } from 'class-validator';

export class CreateTenantDto {
  identificationTypeId: number;

  identificationNumber: string;

  businessName: string;

  code: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  phone?: string;

  @IsOptional()
  active?: boolean;
}
