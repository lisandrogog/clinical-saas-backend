import { Injectable } from '@nestjs/common';
import { CreatePlatformDto } from './dto/create-platform.dto';
import { UpdatePlatformDto } from './dto/update-platform.dto';
import { PrismaService } from '@core/prisma.service';

@Injectable()
export class PlatformService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreatePlatformDto) {
    return await this.prisma.platform.create({
      data: {
        code: dto.code,
        name: dto.name,
      },
    });
  }

  async findAll() {
    return await this.prisma.platform.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.platform.findUnique({
      where: { id },
    });
  }

  async getByCode(code: string) {
    return await this.prisma.platform.findUnique({
      where: { code },
    });
  }

  async update(id: number, dto: UpdatePlatformDto) {
    return await this.prisma.platform.update({
      where: { id },
      data: {
        code: dto.code,
        name: dto.name,
      },
    });
  }

  async upsert(dto: UpdatePlatformDto) {
    return await this.prisma.platform.upsert({
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
