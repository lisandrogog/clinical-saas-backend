import { Injectable } from '@nestjs/common';
import { CreateIdentificationTypeDto } from './dto/create-identification-type.dto';
import { UpdateIdentificationTypeDto } from './dto/update-identification-type.dto';
import { PrismaService } from '@core/prisma.service';

@Injectable()
export class IdentificationTypeService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateIdentificationTypeDto) {
    return await this.prisma.identification_type.create({
      data: {
        code: dto.code,
        name: dto.name,
        item_order: dto.itemOrder || 0,
      },
    });
  }

  async findAll() {
    return await this.prisma.identification_type.findMany({});
  }

  async findOne(id: number) {
    return await this.prisma.identification_type.findUnique({
      where: { id },
    });
  }

  async getByCode(code: string) {
    return await this.prisma.identification_type.findUnique({
      where: { code },
    });
  }

  async update(id: number, dto: UpdateIdentificationTypeDto) {
    return await this.prisma.identification_type.update({
      where: { id },
      data: {
        code: dto.code,
        name: dto.name,
        item_order: dto.itemOrder,
      },
    });
  }

  async upsert(dto: UpdateIdentificationTypeDto) {
    return await this.prisma.identification_type.upsert({
      where: { code: dto.code! },
      update: {
        name: dto.name,
        item_order: dto.itemOrder,
      },
      create: {
        code: dto.code!,
        name: dto.name!,
        item_order: dto.itemOrder || 0,
      },
    });
  }
}
