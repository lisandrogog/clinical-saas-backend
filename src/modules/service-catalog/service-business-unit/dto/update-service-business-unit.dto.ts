import { PartialType } from '@nestjs/mapped-types';
import { CreateServiceBusinessUnitDto } from './create-service-business-unit.dto';

export class UpdateServiceBusinessUnitDto extends PartialType(
  CreateServiceBusinessUnitDto,
) {}
