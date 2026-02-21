import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto, UpdateCustomerDto } from '../dto';
import { PrismaService } from '@core/prisma.service';
import { uuidv7 } from 'uuidv7';
import { BaseSearchPaginationDto } from '@modules/utils/dto';
import { Prisma } from '@prisma/client';
import { UtilsService } from '@modules/utils/services/';
import { CustomerHelperService } from './customer-helper.service';
import {
  ICustomerSearchResponse,
  ICustomSearchCustomer,
} from '../interfaces/customer-search.interface';

@Injectable()
export class CustomerService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly utilsService: UtilsService,
    private readonly customerHelperService: CustomerHelperService,
  ) {}

  async create(tenantId: string, payload: CreateCustomerDto, userId?: string) {
    await this.customerHelperService.assertCustomerNotExists(
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
        is_customer: true,
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
  ): Promise<ICustomerSearchResponse> {
    const { search, page, limit } = searchFilters;

    const where: Prisma.business_partnerWhereInput =
      this.customerHelperService.applySearchFilters(tenantId, search);

    const sanitizedPage = page ? page : 1;
    const sanitizedLimit = limit ? limit : 10;

    const total = await this.prisma.business_partner.count({
      where,
    });

    const customers: ICustomSearchCustomer[] =
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

    const lastPage = Math.ceil(total / sanitizedLimit);

    return {
      data: customers.map((customer) => ({
        id: customer.id,
        identification_number: customer.identification_number,
        identification_type_id: customer.identification_type_id,
        first_name: customer.first_name,
        last_name: customer.last_name,
        ...(customer.birth_date && {
          birth_date: customer.birth_date,
          age: this.utilsService.calculateAge(customer.birth_date),
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
        is_customer: true,
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
      throw new NotFoundException('Customer not found');
    }

    return customer;
  }

  async update(
    tenantId: string,
    id: string,
    payload: UpdateCustomerDto,
    userId?: string,
  ) {
    await this.customerHelperService.assertCustomerExists(tenantId, id);

    return await this.prisma.business_partner.update({
      where: {
        id,
        tenant_id: tenantId,
        removed_at: null,
        is_customer: true,
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
        updated_by: true,
      },
    });
  }

  async remove(tenantId: string, id: string, userId?: string) {
    await this.customerHelperService.assertCustomerExists(tenantId, id);

    return await this.prisma.business_partner.update({
      where: {
        id,
        tenant_id: tenantId,
        removed_at: null,
        is_customer: true,
      },
      data: {
        removed_at: new Date(),
        removed_by: userId,
      },
    });
  }
}
