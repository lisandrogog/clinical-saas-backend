import { BaseCodeDescriptionDto } from '@modules/utils/dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';

export class CreateMaterialResourceTypeDto extends BaseCodeDescriptionDto {
  @ApiProperty({
    description: 'isConsumable',
    example: false,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  isConsumable?: boolean = false;
}
