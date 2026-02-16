import { BaseCodeDescriptionDto } from '@modules/utils/dto/base-code-description.dto';
import { OmitType } from '@nestjs/mapped-types';
import { IsOptional } from 'class-validator';

export class CreateDocumentEngineDto extends OmitType(BaseCodeDescriptionDto, [
  'itemOrder',
] as const) {
  documentTypeId: number;

  initialStateId: number;

  @IsOptional()
  isDefault?: boolean;
}
