import { PartialType } from '@nestjs/mapped-types';
import { CreateAppModuleDto } from './create-app-module.dto';

export class UpdateAppModuleDto extends PartialType(CreateAppModuleDto) {}
