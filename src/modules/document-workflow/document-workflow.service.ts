import { PrismaService } from '@core/prisma.service';
import { DocumentAction, DocumentStatus } from '@enums/index';
import { IDocumentActions } from '@modules/utils/interfaces/document-actions.interface';
import { IDocumentUniqeKeys } from '@modules/utils/interfaces/document-uniqe-keys.interface';
import { Injectable } from '@nestjs/common';
import {
  Prisma,
  document_engine,
  document_status,
  document_type,
} from '@prisma/client';

@Injectable()
export class DocumentWorkflowService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Get actions by service order
   * @param payload Document uniqe keys {
   *   documentId,
   *   tenantId,
   *   businessUnitId
   * }
   * @returns Actions
   */
  async getActionsByServiceOrderId(
    payload: IDocumentUniqeKeys,
  ): Promise<IDocumentActions> {
    const document = await this.getDocumentOrFail(payload);

    return await this.getActions(
      document.document_type,
      document.document_status,
    );
  }

  /**
   * Get actions by document type and document status
   * @param documentType Document type
   * @param documentStatus Document status
   * @returns Actions
   */
  private async getActions(
    documentType: document_type,
    documentStatus: document_status,
  ): Promise<IDocumentActions> {
    const engineItems = await this.getDocumentEngineItems(documentType);

    if (documentStatus.is_final) {
      return {
        documentCurrentState: documentStatus.code,
        nextActions: [],
        previousActions: [],
        message: 'Current document status is final',
      };
    }

    const nextActions: Set<string> = new Set();

    for (const engineItem of engineItems) {
      if (engineItem.from_state_id === documentStatus.id) {
        nextActions.add(engineItem.document_action.code);
      }
    }

    if (!documentStatus.allow_backwards) {
      return {
        documentCurrentState: documentStatus.code,
        nextActions: [...nextActions],
        previousActions: [],
        message: 'Document actions retrieved successfully',
      };
    }

    const previousActions: Set<string> = new Set();
    for (const engineItem of engineItems) {
      if (engineItem.to_state_id === documentStatus.id) {
        previousActions.add(engineItem.document_action.code);
      }
    }

    // si puede devolver a Agendado, también debe poder devolver a pendiente
    if (
      previousActions.size > 0 &&
      !previousActions.has(`${DocumentAction.CONFIRM}`)
    ) {
      previousActions.add(`${DocumentAction.CONFIRM}`);
    }

    // TODO si se devuelve a agendado, y tiene una fecha de agendamiento, borrar fecha de agendamiento y ejecutar RE-AGENDAR.
    if (previousActions.has(`${DocumentAction.SCHEDULE}`)) {
      previousActions.delete(`${DocumentAction.SCHEDULE}`);
    }

    return {
      documentCurrentState: documentStatus.code,
      nextActions: [...nextActions],
      previousActions: [...previousActions],
      message: 'Document actions retrieved successfully',
    };
  }

  /**
   * Get document engine items by document type
   * @param documentType Document type
   * @returns Document engine items
   */
  private async getDocumentEngineItems(documentType: document_type): Promise<
    Prisma.document_engine_itemGetPayload<{
      include: { document_action: true };
    }>[]
  > {
    const documentEngines: document_engine[] =
      await this.prisma.document_engine.findMany({
        where: {
          document_type_id: documentType.id,
        },
        orderBy: {
          id: 'desc',
        },
      });

    if (!documentEngines || documentEngines.length === 0) {
      throw new Error('Document engine not found');
    }

    const documentEngine = this.prioritizeDocumentEngine(documentEngines);

    return await this.prisma.document_engine_item.findMany({
      where: {
        document_engine_id: documentEngine.id,
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

  /**
   * Execute action
   * @param payload Document uniqe keys {
   *  documentId,
   *  tenantId,
   *  businessUnitId
   * }
   * @param actionCode Action code
   * @returns Document
   * @throws Error if document not found
   * @throws Error if action not allowed
   */
  async executeAction(payload: IDocumentUniqeKeys, actionCode: string) {
    // get document
    const document = await this.getDocumentOrFail(payload);

    //get current document status
    const documentStatus = document.document_status;

    if (documentStatus.is_final) {
      throw new Error('Document is already in final state');
    }

    //get actions
    const documentActions = await this.getActions(
      document.document_type,
      document.document_status,
    );

    if (!documentActions) {
      throw new Error('Document actions not found');
    }

    const isActionForward = documentActions.nextActions.includes(actionCode);

    const isActionBackward =
      documentActions.previousActions.includes(actionCode);

    if (!isActionForward && !isActionBackward) {
      throw new Error('Action not allowed for current document state');
    }

    const documentEngineItems = await this.getDocumentEngineItems(
      document.document_type,
    );

    if (!documentEngineItems) {
      throw new Error('Document item action not found');
    }

    if (isActionForward) {
      await this.handleActionForward(
        documentEngineItems,
        actionCode,
        documentStatus,
        payload,
      );
    }

    return await this.handleActionBackward(
      documentEngineItems,
      actionCode,
      documentStatus,
      payload,
    );
  }

  // **************************************************************************
  // Helpers
  // **************************************************************************

  /**
   * Get document by id, tenantId and businessUnitId
   * @param payload {
   *  documentId: string;
   *  tenantId: string;
   *  businessUnitId: string;
   * }
   * @returns document
   * @throws Error if document not found
   */
  private async getDocumentOrFail(payload: IDocumentUniqeKeys) {
    const document = await this.prisma.service_order.findFirst({
      where: {
        id: payload.documentId,
        removed_at: null,
        tenant_id: payload.tenantId,
        business_unit_id: payload.businessUnitId,
      },
      include: {
        document_status: true,
        document_type: true,
      },
    });

    if (!document) {
      throw new Error('Document [Service Order] not found');
    }

    return document;
  }

  /**
   * Prioritize document engine
   * @param documentEngines Document engines
   * @returns Document engine
   */
  private prioritizeDocumentEngine(
    documentEngines: document_engine[],
  ): document_engine {
    // TODO: cuando haya asociación tenant-document-engine,
    // se debe buscar el documento-engine asociado al tenant & tipo de documento
    // por ahora se toma el ordern de prioridad [0 - readonly+default, 1 - default, 2 - some]

    const readonlyDefaultDocumentEngine = documentEngines.find(
      (engine) => engine.readonly && engine.is_default,
    );

    if (readonlyDefaultDocumentEngine) {
      return readonlyDefaultDocumentEngine;
    }

    const defaultDocumentEngine = documentEngines.find(
      (engine) => engine.is_default,
    );

    if (defaultDocumentEngine) {
      return defaultDocumentEngine;
    }

    return documentEngines[0];
  }

  /**
   * Handle action forward
   * @param documentEngineItems Document engine items
   * @param actionCode Action code
   * @param documentStatus Document status
   * @param payload Document uniqe keys
   * @returns Document
   * @throws Error if document item action forward not found
   */
  private async handleActionForward(
    documentEngineItems: Prisma.document_engine_itemGetPayload<{
      include: { document_action: true };
    }>[],
    actionCode: string,
    documentStatus: { id: number },
    payload: IDocumentUniqeKeys,
  ) {
    const documentItemActionsFordward = documentEngineItems.find(
      (item) =>
        item.document_action.code === actionCode &&
        item.from_state_id === documentStatus.id,
    );

    if (!documentItemActionsFordward) {
      throw new Error('Document item action forward not found');
    }

    return await this.handleDocumentChangeState(
      payload,
      documentItemActionsFordward.to_state_id,
    );
  }

  /**
   * Handle action backward
   * @param documentEngineItems Document engine items
   * @param actionCode Action code
   * @param documentStatus Document status
   * @param payload Document uniqe keys
   * @returns Document
   * @throws Error if document item action backward not found
   */
  private async handleActionBackward(
    documentEngineItems: Prisma.document_engine_itemGetPayload<{
      include: { document_action: true };
    }>[],
    actionCode: string,
    documentStatus: {
      id: number;
      allow_backwards: boolean;
    },
    payload: IDocumentUniqeKeys,
  ) {
    if (!documentStatus.allow_backwards) {
      throw new Error('Curent State Does Not Allow Backwards');
    }

    const documentItemActionsBackward = documentEngineItems.find(
      (item) =>
        item.document_action.code === actionCode &&
        item.to_state_id === documentStatus.id,
    );

    if (!documentItemActionsBackward) {
      throw new Error('Document item action backward not found');
    }

    return await this.handleDocumentChangeState(
      payload,
      documentItemActionsBackward.from_state_id,
    );
  }

  /**
   * Handle document change state
   * @param payload Document uniqe keys
   * @param newStateId New state id
   * @returns updated Document
   * @throws Error if new document state not found
   */
  private async handleDocumentChangeState(
    payload: IDocumentUniqeKeys,
    newStateId: number,
  ) {
    const newDocumentState = await this.prisma.document_status.findUnique({
      where: {
        id: newStateId,
      },
    });

    if (!newDocumentState) {
      throw new Error('New document state not found');
    }

    const resetScheduledAt =
      newDocumentState.code === `${DocumentStatus.PENDING}`;

    const isFinal = newDocumentState.is_final;

    await this.prisma.service_order.update({
      where: {
        id: payload.documentId,
        tenant_id: payload.tenantId,
        business_unit_id: payload.businessUnitId,
      },
      data: {
        document_status_id: newStateId,
        ...(resetScheduledAt && { scheduled_at: null }),
        ...(isFinal && { is_final: true }),
      },
    });
  }
}
