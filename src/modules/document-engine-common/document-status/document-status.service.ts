import { Injectable } from '@nestjs/common';
import { CreateDocumentStatusDto } from './dto/create-document-status.dto';
import { UpdateDocumentStatusDto } from './dto/update-document-status.dto';
import { PrismaService } from '@core/prisma.service';

@Injectable()
export class DocumentStatusService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateDocumentStatusDto) {
    return await this.prisma.document_status.create({
      data: {
        code: dto.code,
        name: dto.name,
        is_editable: dto.isEditable ?? false,
        is_final: dto.isFinal ?? false,
        allow_backwards: dto.allowBackwards ?? false,
      },
    });
  }

  async findAll() {
    return await this.prisma.document_status.findMany({});
  }

  async findOne(id: number) {
    return await this.prisma.document_status.findUnique({
      where: { id },
    });
  }

  async getByCode(code: string) {
    return await this.prisma.document_status.findUnique({
      where: { code },
    });
  }

  async update(id: number, dto: UpdateDocumentStatusDto) {
    return await this.prisma.document_status.update({
      where: { id, readonly: false },
      data: {
        code: dto.code,
        name: dto.name,
        ...(dto.isEditable !== undefined && { is_editable: dto.isEditable }),
        ...(dto.isFinal !== undefined && { is_final: dto.isFinal }),
        ...(dto.allowBackwards !== undefined && {
          allow_backwards: dto.allowBackwards,
        }),
      },
    });
  }

  async upsert(dto: UpdateDocumentStatusDto) {
    return await this.prisma.document_status.upsert({
      where: { code: dto.code!, readonly: false },
      update: {
        name: dto.name,
        ...(dto.isEditable !== undefined && { is_editable: dto.isEditable }),
        ...(dto.isFinal !== undefined && { is_final: dto.isFinal }),
        ...(dto.allowBackwards !== undefined && {
          allow_backwards: dto.allowBackwards,
        }),
      },
      create: {
        code: dto.code!,
        name: dto.name!,
        is_editable: dto.isEditable ?? false,
        is_final: dto.isFinal ?? false,
        allow_backwards: dto.allowBackwards ?? false,
      },
    });
  }
}
