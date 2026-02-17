import { Module } from '@nestjs/common';
import { AccessScopeService } from './access-scope.service';
import { AccessScopeController } from './access-scope.controller';
import { PrismaService } from '@core/prisma.service';

@Module({
  controllers: [AccessScopeController],
  providers: [AccessScopeService, PrismaService],
})
export class AccessScopeModule {}
