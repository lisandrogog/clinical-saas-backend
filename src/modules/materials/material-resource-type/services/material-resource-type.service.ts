import { Injectable } from '@nestjs/common';
import {
  CreateMaterialResourceTypeDto,
  UpdateMaterialResourceTypeDto,
} from '@shared-common';
import { PrismaService } from '@core/prisma.service';
import { MaterialResourceTypeHelperService } from './material-resource-type-helper.service';

@Injectable()
export class MaterialResourceTypeService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly helper: MaterialResourceTypeHelperService,
  ) {}

  async create(payload: CreateMaterialResourceTypeDto) {
    await this.helper.assertCodeNotExists(payload.code);

    return await this.prisma.material_resource_type.create({
      data: {
        code: payload.code,
        name: payload.name,
        description: payload.description,
        item_order: payload.itemOrder,
        is_consumable: payload.isConsumable,
      },
      select: {
        id: true,
      },
    });
  }

  async findAll() {
    return await this.prisma.material_resource_type.findMany({
      where: {},
      orderBy: [
        {
          item_order: 'asc',
        },
      ],
    });
  }

  async findOne(id: number) {
    await this.helper.assertExists(id);

    return await this.prisma.material_resource_type.findUnique({
      where: {
        id,
      },
    });
  }

  async findOneByCode(code: string) {
    await this.helper.assertExistsCode(code);

    return await this.prisma.material_resource_type.findUnique({
      where: {
        code,
      },
    });
  }

  async update(id: number, payload: UpdateMaterialResourceTypeDto) {
    await this.helper.assertExistsEditable(id);

    if (payload.code) {
      await this.helper.assertCodeNotRepeated(payload.code, id);
    }

    return await this.prisma.material_resource_type.update({
      where: {
        id,
        readonly: false,
      },
      data: {
        code: payload.code,
        name: payload.name,
        description: payload.description,
        item_order: payload.itemOrder,
        is_consumable: payload.isConsumable,
      },
      select: {
        id: true,
      },
    });
  }

  async remove(id: number) {
    await this.helper.assertExistsAndNotUsed(id);

    return await this.prisma.material_resource_type.delete({
      where: {
        id,
        readonly: false,
      },
    });
  }
}
