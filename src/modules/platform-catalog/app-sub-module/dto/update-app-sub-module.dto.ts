import { PartialType } from '@nestjs/mapped-types';
import { CreateAppSubModuleDto } from './create-app-sub-module.dto';

export class UpdateAppSubModuleDto extends PartialType(CreateAppSubModuleDto) {}
