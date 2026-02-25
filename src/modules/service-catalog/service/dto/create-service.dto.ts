import { BaseCodeNameDto } from '@modules/utils/dto/base-code-name.dto';
import { IsUUID, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateServiceDto extends BaseCodeNameDto {
  @ApiProperty({
    description: 'serviceCategoryId',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: true,
  })
  @IsUUID()
  serviceCategoryId: string;

  @ApiProperty({
    description: 'basePrice',
    example: 30,
    required: true,
  })
  @IsNumber()
  basePrice: number;

  @ApiProperty({
    description: 'baseCost',
    example: 10,
    required: true,
  })
  @IsNumber()
  baseCost: number;

  @ApiProperty({
    description: 'duration',
    example: 40,
    required: true,
  })
  @IsNumber()
  duration: number;
}
