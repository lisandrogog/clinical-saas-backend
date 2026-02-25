import { IsOptional, IsUUID } from 'class-validator';
import { CreateServicesBusinessUnitDto } from './create-services-business-unit.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateServiceProviderServiceDto {
  @ApiProperty({
    description: 'serviceProviderId',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  serviceProviderId: string;

  @ApiProperty({
    description: 'servicesByBusinessUnit',
    example: [
      {
        businessUnitId: '123e4567-e89b-12d3-a456-426614174000',
        services: [
          {
            serviceId: '123e4567-e89b-12d3-a456-426614174000',
            active: true,
          },
        ],
      },
    ],
  })
  @IsOptional()
  servicesByBusinessUnit?: CreateServicesBusinessUnitDto[] = [];
}
