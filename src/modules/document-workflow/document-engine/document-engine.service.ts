import { Injectable } from '@nestjs/common';
import { CreateDocumentEngineDto } from './dto/create-document-engine.dto';
import { UpdateDocumentEngineDto } from './dto/update-document-engine.dto';
import { PrismaService } from '@core/prisma.service';
import { uuidv7 } from 'uuidv7';

@Injectable()
export class DocumentEngineService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateDocumentEngineDto) {
    const documentType = await this.prisma.document_type.findUnique({
      where: { id: dto.documentTypeId },
    });

    if (!documentType) {
      throw new Error('Document type not found');
    }

    const initialState = await this.prisma.document_status.findUnique({
      where: { id: dto.initialStateId },
    });

    if (!initialState) {
      throw new Error('Initial state not found');
    }

    if (dto.isDefault || false) {
      const existingDefault = await this.prisma.document_engine.count({
        where: { document_type_id: dto.documentTypeId, is_default: true },
      });

      if (existingDefault > 0) {
        throw new Error(
          'Default document engine already exists for this document type',
        );
      }
    }

    const id = uuidv7();

    return await this.prisma.document_engine.create({
      data: {
        id,
        code: dto.code,
        name: dto.name,
        description: dto.description,
        document_type_id: documentType.id,
        initial_state_id: initialState.id,
        is_default: dto.isDefault || false,
      },
    });
  }

  async getDefaults() {
    return await this.prisma.document_engine.findMany({
      where: { is_default: true },
      orderBy: {
        code: 'asc',
      },
    });
  }

  async getDefault(documentTypeId: number) {
    return await this.prisma.document_engine.findFirst({
      where: { document_type_id: documentTypeId, is_default: true },
    });
  }

  async findOne(id: string) {
    return await this.prisma.document_engine.findUnique({
      where: { id },
    });
  }

  async update(id: string, dto: UpdateDocumentEngineDto) {
    if (dto.isDefault || false) {
      const existingDefault = await this.prisma.document_engine.count({
        where: {
          document_type_id: dto.documentTypeId,
          is_default: true,
          NOT: { id },
        },
      });

      if (existingDefault > 0) {
        throw new Error(
          'Default document engine already exists for this document type',
        );
      }
    }

    return await this.prisma.document_engine.update({
      where: { id, readonly: false },
      data: {
        code: dto.code,
        name: dto.name,
        description: dto.description,
        ...(dto.isDefault !== undefined && { is_default: dto.isDefault }),
      },
    });
  }

  async remove(id: string) {
    return await this.prisma.document_engine.delete({
      where: { id, readonly: false },
    });
  }
}
