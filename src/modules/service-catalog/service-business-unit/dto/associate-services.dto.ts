import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class AssociateServicesDto {
  @ApiProperty({
    description: 'businessUnitId',
    example: 'uuid',
    required: true,
  })
  @IsUUID()
  businessUnitId: string;

  @ApiProperty({
    description: 'serviceIds',
    example: ['uuid1', 'uuid2'],
    required: true,
  })
  @IsUUID('all', { each: true })
  serviceIds: string[];
}
