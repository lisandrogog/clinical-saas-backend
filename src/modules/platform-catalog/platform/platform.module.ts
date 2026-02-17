import { Module } from '@nestjs/common';
import { PlatformService } from './platform.service';
import { PlatformController } from './platform.controller';
import { PrismaService } from '@core/prisma.service';

@Module({
  controllers: [PlatformController],
  providers: [PlatformService, PrismaService],
})
export class PlatformModule {}
