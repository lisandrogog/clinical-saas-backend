import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsUUID } from 'class-validator';

export class CreateServiceBusinessUnitDto {
  @ApiProperty({
    description: 'serviceId',
    example: 'uuid',
    required: true,
  })
  @IsUUID()
  serviceId: string;

  @ApiProperty({
    description: 'businessUnitId',
    example: 'uuid',
    required: true,
  })
  @IsUUID()
  businessUnitId: string;

  @ApiPropertyOptional({
    description: 'price',
    example: 30,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  price?: number;

  @ApiPropertyOptional({
    description: 'cost',
    example: 10,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  cost?: number;

  @ApiPropertyOptional({
    description: 'duration',
    example: 40,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  duration?: number;

  @ApiPropertyOptional({
    description: 'extraData',
    example: { key: 'value' },
    required: false,
  })
  @IsOptional()
  extraData?: Record<string, any>;
}
