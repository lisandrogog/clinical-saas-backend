import { Injectable } from '@nestjs/common';
import { CreateDocumentEngineItemDto } from './dto/create-document-engine-item.dto';
import { PrismaService } from '@core/prisma.service';
import { isArray } from 'class-validator';
import { uuidv7 } from 'uuidv7';

@Injectable()
export class DocumentEngineItemService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateDocumentEngineItemDto) {
    const documentEngine = await this.prisma.document_engine.findUnique({
      where: { id: dto.documentEngineId },
    });

    if (!documentEngine) {
      throw new Error('Document Engine not found');
    }

    const documentAction = await this.prisma.document_action.findUnique({
      where: { id: dto.documentActionId },
    });

    if (!documentAction) {
      throw new Error('Document Action not found');
    }

    const documentStates = await this.prisma.document_status.findMany({
      where: { id: { in: [dto.fromStateId, dto.toStateId] } },
    });

    if (
      documentStates &&
      isArray(documentStates) &&
      documentStates.length !== 2
    ) {
      throw new Error('One or both Document States not found');
    }

    const fromState = documentStates.find(
      (state) => state.id === dto.fromStateId,
    );

    if (!fromState) {
      throw new Error('From State not found');
    }

    const toState = documentStates.find((state) => state.id === dto.toStateId);

    if (!toState) {
      throw new Error('To State not found');
    }

    const id = uuidv7();

    return await this.prisma.document_engine_item.create({
      data: {
        id,
        document_engine_id: documentEngine.id,
        document_action_id: documentAction.id,
        from_state_id: fromState.id,
        to_state_id: toState.id,
      },
    });
  }

  async findAll(documentEngineId: string) {
    return await this.prisma.document_engine_item.findMany({
      where: { document_engine_id: documentEngineId },
      orderBy: { from_state_id: 'asc', to_state_id: 'asc' },
    });
  }

  async removeAll(documentEngineId: string) {
    return await this.prisma.document_engine_item.deleteMany({
      where: { document_engine_id: documentEngineId },
    });
  }
}
