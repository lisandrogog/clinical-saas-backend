import { Injectable } from '@nestjs/common';
import { CreateDocumentActionDto } from './dto/create-document-action.dto';
import { UpdateDocumentActionDto } from './dto/update-document-action.dto';
import { PrismaService } from '@core/prisma.service';

@Injectable()
export class DocumentActionService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateDocumentActionDto) {
    return await this.prisma.document_action.create({
      data: {
        code: dto.code,
        name: dto.name,
      },
    });
  }

  async findAll() {
    return await this.prisma.document_action.findMany({});
  }

  async findOne(id: number) {
    return await this.prisma.document_action.findUnique({
      where: { id },
    });
  }

  async getByCode(code: string) {
    return await this.prisma.document_action.findUnique({
      where: { code },
    });
  }

  async update(id: number, dto: UpdateDocumentActionDto) {
    return await this.prisma.document_action.update({
      where: { id, readonly: false },
      data: {
        code: dto.code,
        name: dto.name,
      },
    });
  }

  async upsert(dto: UpdateDocumentActionDto) {
    return await this.prisma.document_action.upsert({
      where: { code: dto.code!, readonly: false },
      update: {
        name: dto.name,
      },
      create: {
        code: dto.code!,
        name: dto.name!,
      },
    });
  }
}
