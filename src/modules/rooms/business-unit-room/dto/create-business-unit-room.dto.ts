import { BaseCodeDescriptionDto } from '@modules/utils/dto';
import { IsOptional } from 'class-validator';

export class CreateBusinessUnitRoomDto extends BaseCodeDescriptionDto {
  @IsOptional()
  capacity?: number = 1;

  @IsOptional()
  extraData?: Record<string, any> = {};
}
