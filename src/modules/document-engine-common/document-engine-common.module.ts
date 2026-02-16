import { Module } from '@nestjs/common';
import { DocumentTypeModule } from './document-type/document-type.module';
import { DocumentActionModule } from './document-action/document-action.module';
import { DocumentStatusModule } from './document-status/document-status.module';

@Module({
  imports: [DocumentTypeModule, DocumentActionModule, DocumentStatusModule],
})
export class DocumentEngineCommonModule {}
