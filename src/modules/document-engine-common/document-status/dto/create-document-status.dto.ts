import { BaseCodeNameDto } from '@modules/utils/dto/base-code-name.dto';
import { IsOptional } from 'class-validator';

export class CreateDocumentStatusDto extends BaseCodeNameDto {
  @IsOptional()
  isEditable?: boolean;

  @IsOptional()
  isFinal?: boolean;
}
