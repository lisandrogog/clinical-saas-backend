import { ApiPropertyOptional, OmitType, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';
import { CreateServiceBusinessUnitDto } from './create-service-business-unit.dto';

export class UpdateServiceBusinessUnitDto extends PartialType(
  OmitType(CreateServiceBusinessUnitDto, ['serviceId', 'businessUnitId']),
) {
  @ApiPropertyOptional({
    description: 'isActive',
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  active?: boolean = true;
}
