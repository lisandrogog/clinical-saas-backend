import { IsUUID } from 'class-validator';

export class CreateBusinessPartnerBusinessUnitDto {
  @IsUUID()
  businessUnitId: string;

  @IsUUID()
  businessPartnerId: string;
}
