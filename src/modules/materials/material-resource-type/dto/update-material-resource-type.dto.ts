import { PartialType } from '@nestjs/swagger';
import { CreateMaterialResourceTypeDto } from './create-material-resource-type.dto';

export class UpdateMaterialResourceTypeDto extends PartialType(CreateMaterialResourceTypeDto) {}
