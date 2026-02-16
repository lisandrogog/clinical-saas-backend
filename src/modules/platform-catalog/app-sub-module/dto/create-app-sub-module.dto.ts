import { BaseCodeNameDto } from '@modules/utils/dto/base-code-name.dto';
import { IsOptional } from 'class-validator';

export class CreateAppSubModuleDto extends BaseCodeNameDto {
  appModuleId: number;

  @IsOptional()
  itemOrder?: number;
}
