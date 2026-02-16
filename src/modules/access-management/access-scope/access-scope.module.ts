import { Module } from '@nestjs/common';
import { AccessScopeService } from './access-scope.service';
import { AccessScopeController } from './access-scope.controller';

@Module({
  controllers: [AccessScopeController],
  providers: [AccessScopeService],
})
export class AccessScopeModule {}
