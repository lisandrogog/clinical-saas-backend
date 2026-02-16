import { Injectable } from '@nestjs/common';
import { CreateDocumentTypeDto } from './dto/create-document-type.dto';
import { UpdateDocumentTypeDto } from './dto/update-document-type.dto';
import { PrismaService } from '@core/prisma.service';

@Injectable()
export class DocumentTypeService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateDocumentTypeDto) {
    return await this.prisma.document_type.create({
      data: {
        code: dto.code,
        name: dto.name,
      },
    });
  }

  async findAll() {
    return await this.prisma.document_type.findMany({});
  }

  async findOne(id: number) {
    return await this.prisma.document_type.findUnique({
      where: { id },
    });
  }

  async getByCode(code: string) {
    return await this.prisma.document_type.findUnique({
      where: { code },
    });
  }

  async update(id: number, dto: UpdateDocumentTypeDto) {
    return await this.prisma.document_type.update({
      where: { id },
      data: {
        code: dto.code,
        name: dto.name,
      },
    });
  }

  async upsert(dto: UpdateDocumentTypeDto) {
    return await this.prisma.document_type.upsert({
      where: { code: dto.code! },
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
