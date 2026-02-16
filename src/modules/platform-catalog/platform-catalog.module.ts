import { Module } from '@nestjs/common';
import { PlatformModule } from './platform/platform.module';
import { AppModuleModule } from './app-module/app-module.module';
import { AppSubModuleModule } from './app-sub-module/app-sub-module.module';

@Module({
  imports: [PlatformModule, AppModuleModule, AppSubModuleModule],
})
export class PlatformCatalogModule {}
