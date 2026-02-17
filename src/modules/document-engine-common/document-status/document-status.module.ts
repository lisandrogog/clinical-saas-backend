import { Module } from '@nestjs/common';
import { DocumentStatusService } from './document-status.service';
import { DocumentStatusController } from './document-status.controller';
import { PrismaService } from '@core/prisma.service';

@Module({
  controllers: [DocumentStatusController],
  providers: [DocumentStatusService, PrismaService],
})
export class DocumentStatusModule {}
