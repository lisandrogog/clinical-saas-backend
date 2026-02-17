import { Module } from '@nestjs/common';
import { DocumentEngineItemService } from './document-engine-item.service';
import { DocumentEngineItemController } from './document-engine-item.controller';
import { PrismaService } from '@core/prisma.service';

@Module({
  controllers: [DocumentEngineItemController],
  providers: [DocumentEngineItemService, PrismaService],
})
export class DocumentEngineItemModule {}
