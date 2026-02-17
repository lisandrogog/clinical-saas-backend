import { Module } from '@nestjs/common';
import { DocumentEngineService } from './document-engine.service';
import { DocumentEngineController } from './document-engine.controller';
import { PrismaService } from '@core/prisma.service';

@Module({
  controllers: [DocumentEngineController],
  providers: [DocumentEngineService, PrismaService],
})
export class DocumentEngineModule {}
