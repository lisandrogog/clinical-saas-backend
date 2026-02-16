import { PartialType } from '@nestjs/mapped-types';
import { CreateAppUserStatusDto } from './create-app-user-status.dto';

export class UpdateAppUserStatusDto extends PartialType(
  CreateAppUserStatusDto,
) {}
