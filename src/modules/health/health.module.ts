import { Module } from '@nestjs/common';
import { PrismaService } from '@core/prisma.service';
import { HealthController } from './controllers/health.controller';
import { HealthService } from './services/health.service';

@Module({
  controllers: [HealthController],
  providers: [HealthService, PrismaService],
})
export class HealthModule {}
