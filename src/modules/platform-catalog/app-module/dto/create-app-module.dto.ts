import { BaseCodeNameDto } from '@modules/utils/dto/base-code-name.dto';
import { IsOptional } from 'class-validator';

export class CreateAppModuleDto extends BaseCodeNameDto {
  platformId: number;

  @IsOptional()
  itemOrder?: number;
}
