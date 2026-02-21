import { Module } from '@nestjs/common';
import { AppUserStatusService } from './app-user-status.service';
import { PrismaService } from '@core/prisma.service';

@Module({
  providers: [AppUserStatusService, PrismaService],
})
export class AppUserStatusModule {}
