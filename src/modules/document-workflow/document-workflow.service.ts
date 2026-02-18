import { PrismaService } from '@core/prisma.service';
import { DocumentAction } from '@enums/index';
import { Injectable } from '@nestjs/common';
import { Prisma, document_engine } from '@prisma/client';

@Injectable()
export class DocumentWorkflowService {
  constructor(private readonly prisma: PrismaService) {}

  async getActionsByServiceOrderId(
    documentId: string,
    tenantId: string,
    businessUnitId: string,
  ) {
    const document = await this.prisma.service_order.findUnique({
      where: {
        id: documentId,
        removed_at: null,
        tenant_id: tenantId,
        business_unit_id: businessUnitId,
      },
    });

    if (!document) {
      throw new Error('Document [Service Order] not found');
    }

    return await this.getActions(
      document.document_type_id,
      document.document_status_id,
    );
  }

  private async getActions(documentTypeId: number, documentStatusId: number) {
    const engineItems = await this.getDocumentEngineItems(documentTypeId);

    const documentStatus = await this.prisma.document_status.findUnique({
      where: { id: documentStatusId },
    });

    if (!documentStatus) {
      throw new Error('Document status not found');
    }

    if (documentStatus.is_final) {
      return {
        documentCurrentState: documentStatus.code,
        nextActions: [],
        previousActions: [],
        message: 'Current document status is final',
      };
    }

    const nextActions: string[] = [];

    for (const engineItem of engineItems) {
      if (engineItem.from_state_id === documentStatusId) {
        if (!nextActions.includes(engineItem.document_action.code)) {
          nextActions.push(engineItem.document_action.code);
        }
      }
    }

    const previousActions: string[] = [];
    if (documentStatus.allow_backwards) {
      for (const engineItem of engineItems) {
        if (engineItem.to_state_id === documentStatusId) {
          if (!previousActions.includes(engineItem.document_action.code)) {
            previousActions.push(engineItem.document_action.code);
          }
        }
      }
    }

    // si puede devolver a Agendado, que también pueda devolver a pendiente
    if (
      previousActions.length > 0 &&
      !previousActions.includes(`${DocumentAction.CONFIRM}`)
    ) {
      previousActions.unshift(`${DocumentAction.CONFIRM}`);
    }

    // TODO si se devuelve a agendado, y tiene una fecha de agendamiento, borrar fecha de agendamiento y ejecutar RE-AGENDAR.
    if (previousActions.includes(`${DocumentAction.SCHEDULE}`)) {
      previousActions.splice(
        previousActions.indexOf(`${DocumentAction.SCHEDULE}`),
        1,
      );
      previousActions.push(`${DocumentAction.RE_SCHEDULE}`);
    }

    return {
      documentCurrentState: documentStatus.code,
      nextActions: Array.from(nextActions),
      previousActions: Array.from(previousActions),
      message: 'Document actions retrieved successfully',
    };
  }

  private async getDocumentEngineItems(documentTypeId: number): Promise<
    Prisma.document_engine_itemGetPayload<{
      include: { document_action: true };
    }>[]
  > {
    const documentType = await this.prisma.document_type.findUnique({
      where: { id: documentTypeId },
    });

    if (!documentType) {
      throw new Error('Document type not found');
    }

    const documentEngines: document_engine[] =
      await this.prisma.document_engine.findMany({
        where: {
          document_type_id: documentTypeId,
        },
        orderBy: {
          id: 'desc',
        },
      });

    if (!documentEngines || documentEngines.length === 0) {
      throw new Error('Document engine not found');
    }

    // TODO: cuando haya asociación tenant-document-engine,
    // se debe buscar el documento-engine asociado al tenant & tipo de documento
    // por ahora se toma el ordern de prioridad [0 - readonly+default, 1 - default, 2 - some]

    const readonlyDefaultDocumentEngine = documentEngines.find(
      (engine) => engine.readonly && engine.is_default,
    );

    if (readonlyDefaultDocumentEngine) {
      return await this.prisma.document_engine_item.findMany({
        where: {
          document_engine_id: readonlyDefaultDocumentEngine.id,
        },
        include: {
          document_action: true,
        },
        orderBy: {
          document_action: {
            item_order: 'asc',
          },
        },
      });
    }

    const defaultDocumentEngine = documentEngines.find(
      (engine) => engine.is_default,
    );

    if (defaultDocumentEngine) {
      return await this.prisma.document_engine_item.findMany({
        where: {
          document_engine_id: defaultDocumentEngine.id,
        },
        include: {
          document_action: true,
        },
        orderBy: {
          document_action: {
            item_order: 'asc',
          },
        },
      });
    }

    return await this.prisma.document_engine_item.findMany({
      where: {
        document_engine_id: documentEngines[0].id,
      },
      include: {
        document_action: true,
      },
      orderBy: {
        document_action: {
          item_order: 'asc',
        },
      },
    });
  }

  // TODO getActionsByDocument(documentId: string) {}
  // document-type, document-status, document-engine, document-action, document-engine-item(transition)
  // {actions_forward: [], actions_backward: []}

  // TODO executeAction(documentId: string, actionCode: string) {}

  // helpers

  // canExecuteAction(documentId: string, actionCode: string) {}
}
