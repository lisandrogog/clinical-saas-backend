import { PartialType } from '@nestjs/swagger';
import { CreateServiceMaterialResourceDto } from './create-service-material-resource.dto';

export class UpdateServiceMaterialResourceDto extends PartialType(CreateServiceMaterialResourceDto) {}
