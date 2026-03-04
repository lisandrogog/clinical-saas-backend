import { PartialType } from '@nestjs/swagger';
import { CreateBusinessUnitRoomDto } from './create-business-unit-room.dto';
import { IsOptional } from 'class-validator';

export class UpdateBusinessUnitRoomDto extends PartialType(
  CreateBusinessUnitRoomDto,
) {
  @IsOptional()
  active?: boolean;
}
