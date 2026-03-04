import { IsUUID, IsArray } from 'class-validator';

export class BusinessUnitRoomServicesDto {
  @IsUUID()
  businessUnitRoomId: string;

  @IsArray()
  @IsUUID('all', { each: true })
  serviceIds: string[];
}
