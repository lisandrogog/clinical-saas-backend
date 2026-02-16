import { PartialType } from '@nestjs/mapped-types';
import { CreateAccessScopeDto } from './create-access-scope.dto';

export class UpdateAccessScopeDto extends PartialType(CreateAccessScopeDto) {}
