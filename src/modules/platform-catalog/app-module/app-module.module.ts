import { Module } from '@nestjs/common';
import { AppModuleService } from './app-module.service';
import { PrismaService } from '@core/prisma.service';

@Module({
  providers: [AppModuleService, PrismaService],
})
export class AppModuleModule {}
