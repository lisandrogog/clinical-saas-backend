import { IsOptional, IsUUID } from 'class-validator';
import { CreateServicesBusinessUnitDto } from './create-services-business-unit.dto';

export class CreateServiceProviderServiceDto {
  @IsUUID()
  serviceProviderId: string;

  @IsOptional()
  servicesByBusinessUnit?: CreateServicesBusinessUnitDto[];
}
