import { Module } from '@nestjs/common';
import { DocumentEngineService } from './document-engine.service';
import { DocumentEngineController } from './document-engine.controller';

@Module({
  controllers: [DocumentEngineController],
  providers: [DocumentEngineService],
})
export class DocumentEngineModule {}
