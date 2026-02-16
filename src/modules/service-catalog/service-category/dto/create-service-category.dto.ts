import { BaseCodeNameDto } from '@modules/utils/dto/base-code-name.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class CreateServiceCategoryDto extends BaseCodeNameDto {
  @IsOptional()
  @IsBoolean()
  active?: boolean = true;
}
