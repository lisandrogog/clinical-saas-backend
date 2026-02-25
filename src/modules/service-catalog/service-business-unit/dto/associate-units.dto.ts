import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class AssociateUnitsDto {
  @ApiProperty({
    description: 'serviceId',
    example: 'uuid',
    required: true,
  })
  @IsUUID()
  serviceId: string;

  @ApiProperty({
    description: 'businessUnitIds',
    example: ['uuid1', 'uuid2'],
    required: true,
  })
  @IsUUID('all', { each: true })
  businessUnitIds: string[];
}
