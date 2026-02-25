import { Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { DtoI18nKeys } from '../constants/i18n.constants';

export class BaseBusinessPartnerDto {
  @ApiProperty({ description: DtoI18nKeys.identificationTypeId, example: 1 })
  @IsNumber()
  identificationTypeId: number;

  @ApiProperty({
    description: DtoI18nKeys.identificationNumber,
    example: 'V-12345678',
  })
  @IsString()
  identificationNumber: string;

  @ApiPropertyOptional({ description: DtoI18nKeys.firstName, example: 'John' })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiPropertyOptional({ description: DtoI18nKeys.lastName, example: 'Doe' })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiPropertyOptional({
    description: DtoI18nKeys.email,
    example: 'juan.perez@example.com',
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({
    description: DtoI18nKeys.phone,
    example: '+58912345678',
  })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({
    description: DtoI18nKeys.birthDate,
    example: '1990-01-01',
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  birthDate?: Date;

  @ApiPropertyOptional({
    description: DtoI18nKeys.shortAddress,
    example: 'Av. Siempre Viva 742',
  })
  @IsOptional()
  @IsString()
  shortAddress?: string;

  @ApiPropertyOptional({ description: DtoI18nKeys.address })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({ description: DtoI18nKeys.extraData })
  @IsOptional()
  @IsObject()
  extraData?: Record<string, any>;
}
