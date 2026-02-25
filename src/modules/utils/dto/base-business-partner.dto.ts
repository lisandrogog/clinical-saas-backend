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

export class BaseBusinessPartnerDto {
  @ApiProperty({ description: 'identificationTypeId', example: 1 })
  @IsNumber()
  identificationTypeId: number;

  @ApiProperty({
    description: 'identificationNumber',
    example: 'V-12345678',
  })
  @IsString()
  identificationNumber: string;

  @ApiPropertyOptional({ description: 'firstName', example: 'John' })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiPropertyOptional({ description: 'lastName', example: 'Doe' })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiPropertyOptional({
    description: 'email',
    example: 'juan.perez@example.com',
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({
    description: 'phone',
    example: '+58912345678',
  })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({
    description: 'birthDate',
    example: '1990-01-01',
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  birthDate?: Date;

  @ApiPropertyOptional({
    description: 'shortAddress',
    example: 'Av. Siempre Viva 742',
  })
  @IsOptional()
  @IsString()
  shortAddress?: string;

  @ApiPropertyOptional({ description: 'address' })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({ description: 'extraData' })
  @IsOptional()
  @IsObject()
  extraData?: Record<string, any>;
}
