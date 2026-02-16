import { PartialType } from '@nestjs/mapped-types';
import { CreateAppUserDto } from './create-app-user.dto';
import { IsOptional } from 'class-validator';

export class UpdateAppUserDto extends PartialType(CreateAppUserDto) {
  @IsOptional()
  appUserStatusId?: number;
}
