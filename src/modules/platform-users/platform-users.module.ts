import { Module } from '@nestjs/common';
import { AppUserModule } from './app-user/app-user.module';
import { AppUserBusinessUnitModule } from './app-user-business-unit/app-user-business-unit.module';
import { AppUserStatusModule } from './app-user-status/app-user-status.module';
import { PrismaService } from '@core/prisma.service';

@Module({
  imports: [AppUserModule, AppUserBusinessUnitModule, AppUserStatusModule],
  providers: [PrismaService],
})
export class PlatformUsersModule {}
