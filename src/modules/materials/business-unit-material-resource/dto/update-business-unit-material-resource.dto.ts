import { PartialType } from '@nestjs/swagger';
import { CreateBusinessUnitMaterialResourceDto } from './create-business-unit-material-resource.dto';

export class UpdateBusinessUnitMaterialResourceDto extends PartialType(
  CreateBusinessUnitMaterialResourceDto,
) {}
