import { Module } from '@nestjs/common';
import { AppSubModuleService } from './app-sub-module.service';
import { AppSubModuleController } from './app-sub-module.controller';

@Module({
  controllers: [AppSubModuleController],
  providers: [AppSubModuleService],
})
export class AppSubModuleModule {}
