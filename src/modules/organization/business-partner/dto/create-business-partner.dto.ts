import {
  IsBoolean,
  IsEmail,
  IsNumber,
  IsOptional,
  IsUUID,
} from 'class-validator';

export class CreateBusinessPartnerDto {
  @IsUUID()
  tenantId: string;

  @IsNumber()
  identificationTypeId: number;

  identificationNumber: string;

  @IsOptional()
  firstName?: string;

  @IsOptional()
  lastName?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  phone?: string;

  @IsOptional()
  address?: string;

  @IsOptional()
  @IsBoolean()
  isCustomer: boolean;

  @IsOptional()
  @IsBoolean()
  isAgent: boolean;

  @IsOptional()
  @IsBoolean()
  active?: boolean;

  @IsOptional()
  extraData?: Record<string, any>;
}
