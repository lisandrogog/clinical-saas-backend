import { Module } from '@nestjs/common';
import { AccessScopeService } from './access-scope.service';
import { PrismaService } from '@core/prisma.service';

@Module({
  providers: [AccessScopeService, PrismaService],
})
export class AccessScopeModule {}
