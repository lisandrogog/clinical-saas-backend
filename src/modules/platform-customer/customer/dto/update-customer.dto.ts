import { PartialType } from '@nestjs/swagger';
import { CreateCustomerDto } from './create-customer.dto';
import { IsOptional } from 'class-validator';
import { DtoI18nKeys } from '../constants/i18n.constants';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {
  @ApiPropertyOptional({
    description: DtoI18nKeys.isActive,
    example: true,
    required: false,
  })
  @IsOptional()
  active?: boolean;
}
