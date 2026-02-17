import { PrismaService } from '@core/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DocumentWorkflowService {
  constructor(private readonly prisma: PrismaService) {}

  // TODO getActionsByDocument(documentId: string) {}
  // document-type, document-status, document-engine, document-action, document-engine-item(transition)
  // {actions_forward: [], actions_backward: []}

  // TODO executeAction(documentId: string, actionCode: string) {}

  // helpers

  // canExecuteAction(documentId: string, actionCode: string) {}
}
