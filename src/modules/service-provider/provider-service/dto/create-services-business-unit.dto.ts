import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsOptional, IsUUID, ValidateNested } from 'class-validator';
import { CreateServiceDto } from './create-service.dto';

export class CreateServicesBusinessUnitDto {
  @ApiProperty({
    description: 'businessUnitId',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  businessUnitId: string;

  @ApiProperty({
    description: 'services',
    example: [
      {
        serviceId: '123e4567-e89b-12d3-a456-426614174000',
        active: true,
      },
    ],
  })
  @IsArray()
  @Type(() => CreateServiceDto)
  @ValidateNested({ each: true })
  @IsOptional()
  services?: CreateServiceDto[] = [];
}
