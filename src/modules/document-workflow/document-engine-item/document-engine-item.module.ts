import { Module } from '@nestjs/common';
import { DocumentEngineItemService } from './document-engine-item.service';
import { DocumentEngineItemController } from './document-engine-item.controller';

@Module({
  controllers: [DocumentEngineItemController],
  providers: [DocumentEngineItemService],
})
export class DocumentEngineItemModule {}
