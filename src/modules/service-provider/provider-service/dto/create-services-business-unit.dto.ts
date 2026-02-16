import { IsOptional, IsUUID } from 'class-validator';
import { CreateServiceDto } from './create-service.dto';

export class CreateServicesBusinessUnitDto {
  @IsUUID()
  businessUnitId: string;

  @IsOptional()
  services?: CreateServiceDto[];
}
