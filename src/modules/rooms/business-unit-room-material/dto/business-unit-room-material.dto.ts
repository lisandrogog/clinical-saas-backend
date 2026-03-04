import { IsUUID } from 'class-validator';

export class BusinessUnitRoomMaterialDto {
  @IsUUID()
  businessUnitRoomId: string;

  @IsUUID()
  materialId: string;
}
