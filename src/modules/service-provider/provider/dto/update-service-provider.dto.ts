import { PartialType } from '@nestjs/mapped-types';
import { CreateServiceProviderDto } from './create-service-provider.dto';
import { IsBoolean, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateServiceProviderDto extends PartialType(
  CreateServiceProviderDto,
) {
  @ApiPropertyOptional({
    description: 'isActive',
    example: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  active?: boolean;
}
