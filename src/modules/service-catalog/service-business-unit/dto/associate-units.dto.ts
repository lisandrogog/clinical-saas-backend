import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { DtoI18nKeys as ServiceDtoI18nKeys } from '@modules/service-catalog/service/constants/i18n.constants';
import { DtoI18nKeys as BusinessUnitDtoI18nKeys } from '@modules/organization/business-unit/constants/i18n.constants';

export class AssociateUnitsDto {
  @ApiProperty({
    description: ServiceDtoI18nKeys.serviceId,
    example: 'uuid',
    required: true,
  })
  @IsUUID()
  serviceId: string;

  @ApiProperty({
    description: BusinessUnitDtoI18nKeys.businessUnitIds,
    example: ['uuid1', 'uuid2'],
    required: true,
  })
  @IsUUID('all', { each: true })
  businessUnitIds: string[];
}
