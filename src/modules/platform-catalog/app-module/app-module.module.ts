import { Module } from '@nestjs/common';
import { AppModuleService } from './app-module.service';
import { AppModuleController } from './app-module.controller';

@Module({
  controllers: [AppModuleController],
  providers: [AppModuleService],
})
export class AppModuleModule {}
