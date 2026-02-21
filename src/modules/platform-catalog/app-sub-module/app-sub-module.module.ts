import { Module } from '@nestjs/common';
import { AppSubModuleService } from './app-sub-module.service';
import { PrismaService } from '@core/prisma.service';

@Module({
  providers: [AppSubModuleService, PrismaService],
})
export class AppSubModuleModule {}
