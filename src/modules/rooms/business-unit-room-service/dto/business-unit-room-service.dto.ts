import { IsUUID } from 'class-validator';

export class BusinessUnitRoomServiceDto {
  @IsUUID()
  businessUnitRoomId: string;

  @IsUUID()
  serviceId: string;
}
