import { Controller, Get, Headers, Param, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DocumentWorkflowService } from './document-workflow.service';

@ApiTags('document-workflow')
@Controller('document-workflow')
export class DocumentWorkflowController {
  constructor(
    private readonly documentWorkflowService: DocumentWorkflowService,
  ) {}

  @Get('actions/:documentId')
  async getActionsByServiceOrderId(
    @Param('documentId') documentId: string,
    @Headers('tenant-id') tenantId: string,
    @Headers('business-unit-id') businessUnitId: string,
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
    @Headers('tenant-id') tenantId: string,
    @Headers('business-unit-id') businessUnitId: string,
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
