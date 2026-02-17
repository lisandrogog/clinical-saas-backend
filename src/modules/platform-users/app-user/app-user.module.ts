import { Module } from '@nestjs/common';
import { AppUserService } from './app-user.service';
import { AppUserController } from './app-user.controller';
import { PrismaService } from '@core/prisma.service';
import { HashService } from '@modules/utils/services/hash.service';

@Module({
  controllers: [AppUserController],
  providers: [AppUserService, PrismaService, HashService],
})
export class AppUserModule {}
