import { Module } from '@nestjs/common';
import { PlatformService } from './platform.service';
import { PrismaService } from '@core/prisma.service';

@Module({
  providers: [PlatformService, PrismaService],
})
export class PlatformModule {}
