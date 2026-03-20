import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DocumentWorkflowService } from './document-workflow.service';
import { BusinessUnitId, TenantId } from '@modules/utils/decorators';

@ApiTags('document-workflow')
@Controller('document-workflow')
export class DocumentWorkflowController {
  constructor(
    private readonly documentWorkflowService: DocumentWorkflowService,
  ) {}

  @Get('actions/:documentId')
  async getActionsByServiceOrderId(
    @Param('documentId') documentId: string,
    @TenantId() tenantId: string,
    @BusinessUnitId() businessUnitId: string,
  ) {
    return await this.documentWorkflowService.getActionsByServiceOrderId({
      documentId,
      tenantId,
      businessUnitId,
    });
  }

  @Post('actions/:documentId')
  async executeAction(
    @Param('documentId') documentId: string,
    @TenantId() tenantId: string,
    @BusinessUnitId() businessUnitId: string,
    @Query('actionCode') actionCode: string,
  ) {
    return await this.documentWorkflowService.executeAction(
      {
        documentId,
        tenantId,
        businessUnitId,
      },
      actionCode,
    );
  }
}
