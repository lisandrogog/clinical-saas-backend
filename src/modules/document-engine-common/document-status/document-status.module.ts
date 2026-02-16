import { Module } from '@nestjs/common';
import { DocumentStatusService } from './document-status.service';
import { DocumentStatusController } from './document-status.controller';

@Module({
  controllers: [DocumentStatusController],
  providers: [DocumentStatusService],
})
export class DocumentStatusModule {}
