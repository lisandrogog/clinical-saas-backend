import { Module } from '@nestjs/common';
import { AppModuleService } from './app-module.service';
import { AppModuleController } from './app-module.controller';
import { PrismaService } from '@core/prisma.service';

@Module({
  controllers: [AppModuleController],
  providers: [AppModuleService, PrismaService],
})
export class AppModuleModule {}
