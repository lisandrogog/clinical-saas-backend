import { Module } from '@nestjs/common';
import { AppUserStatusService } from './app-user-status.service';
import { AppUserStatusController } from './app-user-status.controller';
import { PrismaService } from '@core/prisma.service';

@Module({
  controllers: [AppUserStatusController],
  providers: [AppUserStatusService, PrismaService],
})
export class AppUserStatusModule {}
