import { CreateServiceDto } from './create-service.dto';
import { IsBoolean, IsOptional } from 'class-validator';
import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';

export class UpdateServiceDto extends PartialType(CreateServiceDto) {
  @ApiPropertyOptional({
    description: 'isActive',
    example: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  active?: boolean = true;
}
