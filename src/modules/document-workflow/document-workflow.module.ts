import { Module } from '@nestjs/common';
import { DocumentEngineModule } from './document-engine/document-engine.module';
import { DocumentEngineItemModule } from './document-engine-item/document-engine-item.module';

@Module({
  imports: [DocumentEngineModule, DocumentEngineItemModule],
})
export class DocumentWorkflowModule {}
