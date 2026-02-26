import { PartialType } from '@nestjs/swagger';
import { CreateMaterialResourceDto } from './create-material-resource.dto';

export class UpdateMaterialResourceDto extends PartialType(CreateMaterialResourceDto) {}
