import { Module } from '@nestjs/common';
import { DocumentActionService } from './document-action.service';
import { DocumentActionController } from './document-action.controller';
import { PrismaService } from '@core/prisma.service';

@Module({
  controllers: [DocumentActionController],
  providers: [DocumentActionService, PrismaService],
})
export class DocumentActionModule {}
