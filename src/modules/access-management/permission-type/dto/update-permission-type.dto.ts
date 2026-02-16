import { PartialType } from '@nestjs/mapped-types';
import { CreatePermissionTypeDto } from './create-permission-type.dto';

export class UpdatePermissionTypeDto extends PartialType(
  CreatePermissionTypeDto,
) {}
