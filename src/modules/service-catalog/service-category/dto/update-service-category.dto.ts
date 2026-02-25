import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';
import { CreateServiceCategoryDto } from './create-service-category.dto';

export class UpdateServiceCategoryDto extends PartialType(
  CreateServiceCategoryDto,
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
