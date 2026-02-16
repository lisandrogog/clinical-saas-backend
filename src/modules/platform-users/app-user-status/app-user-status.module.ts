import { Module } from '@nestjs/common';
import { AppUserStatusService } from './app-user-status.service';
import { AppUserStatusController } from './app-user-status.controller';

@Module({
  controllers: [AppUserStatusController],
  providers: [AppUserStatusService],
})
export class AppUserStatusModule {}
