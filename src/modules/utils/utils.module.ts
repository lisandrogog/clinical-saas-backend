import { Module } from '@nestjs/common';
import { UtilsService } from './services/utils.service';
import { HashService } from './services/hash.service';

@Module({
  providers: [UtilsService, HashService],
  exports: [UtilsService, HashService],
})
export class UtilsModule {}
