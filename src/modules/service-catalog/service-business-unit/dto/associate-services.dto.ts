import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { DtoI18nKeys as ServiceDtoI18nKeys } from '@modules/service-catalog/service/constants/i18n.constants';
import { DtoI18nKeys as BusinessUnitDtoI18nKeys } from '@modules/organization/business-unit/constants/i18n.constants';

export class AssociateServicesDto {
  @ApiProperty({
    description: BusinessUnitDtoI18nKeys.businessUnitId,
    example: 'uuid',
    required: true,
  })
  @IsUUID()
  businessUnitId: string;

  @ApiProperty({
    description: ServiceDtoI18nKeys.serviceIds,
    example: ['uuid1', 'uuid2'],
    required: true,
  })
  @IsUUID('all', { each: true })
  serviceIds: string[];
}
