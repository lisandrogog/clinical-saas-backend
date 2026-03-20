import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateServiceProviderDto,
  UpdateServiceProviderDto,
  IProviderSearch,
  IProviderSearchResponse,
} from '@shared-common';
import { PrismaService } from '@core/prisma.service';
import { uuidv7 } from 'uuidv7';
import { UtilsService } from '@modules/utils/services';
import { ProviderHelperService } from './provider-helper.service';
import { BaseSearchPaginationDto } from '@modules/utils/dto';

import { Prisma } from '@prisma/client';
import { I18nKeys } from '../constants/i18n.constants';

@Injectable()
export class ProviderService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly utilsService: UtilsService,
    private readonly providerHelperService: ProviderHelperService,
  ) {}

  async create(
    tenantId: string,
    payload: CreateServiceProviderDto,
    userId?: string,
  ) {
    await this.providerHelperService.assertProviderNotExists(
      tenantId,
      payload.identificationTypeId,
      payload.identificationNumber,
    );

    const id = uuidv7();

    return await this.prisma.business_partner.create({
      data: {
        id,
        tenant_id: tenantId,
        identification_number: payload.identificationNumber,
        identification_type_id: payload.identificationTypeId,
        first_name: payload.firstName,
        last_name: payload.lastName,
        email: payload.email,
        phone: payload.phone,
        birth_date: payload.birthDate,
        short_address: payload.shortAddress,
        address: payload.address,
        extra_data: payload.extraData,
        is_supplier: true,
        created_by: userId,
      },
      select: {
        id: true,
      },
    });
  }

  async findAll(
    tenantId: string,
    searchFilters: BaseSearchPaginationDto,
  ): Promise<IProviderSearchResponse> {
    const { search, page, limit } = searchFilters;

    const where: Prisma.business_partnerWhereInput =
      this.providerHelperService.applySearchFilters(tenantId, search);

    const sanitizedPage = page ? page : 1;

    const sanitizedLimit = limit ? limit : 10;

    const total = await this.prisma.business_partner.count({
      where,
    });

    const lastPage = Math.ceil(total / sanitizedLimit);

    const providers: IProviderSearch[] =
      await this.prisma.business_partner.findMany({
        where,
        skip: (sanitizedPage - 1) * sanitizedLimit,
        take: sanitizedLimit,
        select: {
          id: true,
          identification_number: true,
          identification_type_id: true,
          first_name: true,
          last_name: true,
          birth_date: true,
        },
        orderBy: [
          {
            first_name: 'asc',
          },
          {
            last_name: 'asc',
          },
        ],
      });

    return {
      data: providers.map((provider) => ({
        id: provider.id,
        identification_number: provider.identification_number,
        identification_type_id: provider.identification_type_id,
        first_name: provider.first_name,
        last_name: provider.last_name,
        ...(provider.birth_date && {
          birth_date: provider.birth_date,
          age: this.utilsService.calculateAge(provider.birth_date),
        }),
      })),
      meta: {
        total,
        page: sanitizedPage,
        lastPage,
      },
    };
  }

  async findOne(tenantId: string, id: string) {
    const customer = await this.prisma.business_partner.findFirst({
      where: {
        id,
        tenant_id: tenantId,
        removed_at: null,
        is_supplier: true,
      },
      select: {
        id: true,
        identification_number: true,
        identification_type_id: true,
        first_name: true,
        last_name: true,
        birth_date: true,
        email: true,
        phone: true,
        short_address: true,
        address: true,
        extra_data: true,
        active: true,
      },
    });

    if (!customer) {
      throw new NotFoundException(I18nKeys.errors.notFound);
    }

    return customer;
  }

  async update(
    tenantId: string,
    id: string,
    payload: UpdateServiceProviderDto,
    userId?: string,
  ) {
    await this.providerHelperService.assertProviderExists(tenantId, id);

    return await this.prisma.business_partner.update({
      where: {
        id,
        tenant_id: tenantId,
        removed_at: null,
        is_supplier: true,
      },
      data: {
        identification_number: payload.identificationNumber,
        identification_type_id: payload.identificationTypeId,
        first_name: payload.firstName,
        last_name: payload.lastName,
        email: payload.email,
        phone: payload.phone,
        birth_date: payload.birthDate,
        short_address: payload.shortAddress,
        address: payload.address,
        extra_data: payload.extraData,
        ...(payload.active !== undefined && { active: payload.active }),
        updated_at: new Date(),
        updated_by: userId,
      },
      select: {
        id: true,
        updated_at: true,
      },
    });
  }

  async remove(tenantId: string, id: string, userId?: string) {
    await this.providerHelperService.assertProviderExists(tenantId, id);

    return await this.prisma.business_partner.update({
      where: {
        id,
        tenant_id: tenantId,
        removed_at: null,
        is_supplier: true,
      },
      data: {
        removed_at: new Date(),
        removed_by: userId,
      },
      select: {
        id: true,
        removed_at: true,
      },
    });
  }
}
