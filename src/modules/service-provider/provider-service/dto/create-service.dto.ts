import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsUUID } from 'class-validator';

export class CreateServiceDto {
  @ApiProperty({
    description: 'serviceId',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  serviceId: string;

  @ApiProperty({
    description: 'isActive',
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  active?: boolean = true;
}
