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
  @ApiProperty({ description: 'ID del tipo de identificación', example: 1 })
  @IsNumber()
  identificationTypeId: number;

  @ApiProperty({
    description: 'Número de identificación',
    example: 'V-12345678',
  })
  @IsString()
  identificationNumber: string;

  @ApiPropertyOptional({ description: 'Nombres', example: 'John' })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiPropertyOptional({ description: 'Apellidos', example: 'Doe' })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiPropertyOptional({
    description: 'Correo electrónico',
    example: 'juan.perez@example.com',
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({
    description: 'Número de teléfono',
    example: '+58912345678',
  })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({
    description: 'Fecha de nacimiento',
    example: '1990-01-01',
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  birthDate?: Date;

  @ApiPropertyOptional({
    description: 'Dirección corta/referencia',
    example: 'Av. Siempre Viva 742',
  })
  @IsOptional()
  @IsString()
  shortAddress?: string;

  @ApiPropertyOptional({ description: 'Dirección completa' })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({ description: 'Datos adicionales en formato JSON' })
  @IsOptional()
  @IsObject()
  extraData?: Record<string, any>;
}
