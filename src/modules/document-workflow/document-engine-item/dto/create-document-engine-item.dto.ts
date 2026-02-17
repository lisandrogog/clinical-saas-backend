import { IsUUID } from 'class-validator';

export class CreateDocumentEngineItemDto {
  @IsUUID()
  documentEngineId: string;

  documentActionId: number;

  fromStateId: number;

  toStateId: number;
}
