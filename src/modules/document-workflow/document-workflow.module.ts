import { Module } from '@nestjs/common';
import { DocumentEngineModule } from './document-engine/document-engine.module';
import { DocumentEngineItemModule } from './document-engine-item/document-engine-item.module';
import { PrismaService } from '@core/prisma.service';

@Module({
  imports: [DocumentEngineModule, DocumentEngineItemModule],
  providers: [PrismaService],
})
export class DocumentWorkflowModule {}
