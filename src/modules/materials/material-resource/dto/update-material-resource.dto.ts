import { PartialType } from '@nestjs/swagger';
import { CreateMaterialResourceDto } from './create-material-resource.dto';
import { IsBoolean } from 'class-validator';

export class UpdateMaterialResourceDto extends PartialType(
  CreateMaterialResourceDto,
) {
  @IsBoolean()
  active?: boolean = true;
}
