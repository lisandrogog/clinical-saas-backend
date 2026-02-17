import { Module } from '@nestjs/common';
import { AppSubModuleService } from './app-sub-module.service';
import { AppSubModuleController } from './app-sub-module.controller';
import { PrismaService } from '@core/prisma.service';

@Module({
  controllers: [AppSubModuleController],
  providers: [AppSubModuleService, PrismaService],
})
export class AppSubModuleModule {}
