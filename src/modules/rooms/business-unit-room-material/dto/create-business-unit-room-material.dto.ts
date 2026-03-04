import { IsNumber, IsOptional } from 'class-validator';
import { BusinessUnitRoomMaterialDto } from './business-unit-room-material.dto';

export class CreateBusinessUnitRoomMaterialDto extends BusinessUnitRoomMaterialDto {
  @IsNumber()
  @IsOptional()
  quantity?: number = 1;
}
