import { IsBoolean, IsOptional, IsUUID } from 'class-validator';
import { BaseBusinessPartnerDto } from 'src/modules/utils/dto/base-business-partner.dto';

export class CreateBusinessPartnerDto extends BaseBusinessPartnerDto {
  @IsUUID()
  tenantId: string;

  @IsOptional()
  @IsBoolean()
  isCustomer: boolean;

  @IsOptional()
  @IsBoolean()
  isAgent: boolean;

  @IsOptional()
  @IsBoolean()
  active?: boolean = true;
}
