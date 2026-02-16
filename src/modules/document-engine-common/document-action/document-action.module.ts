import { Module } from '@nestjs/common';
import { DocumentActionService } from './document-action.service';
import { DocumentActionController } from './document-action.controller';

@Module({
  controllers: [DocumentActionController],
  providers: [DocumentActionService],
})
export class DocumentActionModule {}
