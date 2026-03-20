import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '@core/prisma.service';
import { ServiceBusinessUnitHelperService } from './service-business-unit-helper.service';
import { AssociateServicesDto, AssociateUnitsDto } from '@shared-common';
import { I18nKeys as ServiceI18nKeys } from '@modules/service-catalog/service/constants/i18n.constants';
import { I18nKeys } from '../constants/i18n.constants';

@Injectable()
export class ServiceBusinessUnitAssociationService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly helper: ServiceBusinessUnitHelperService,
  ) {}

  async associateServices(
    tenantId: string,
    payload: AssociateServicesDto,
    userId?: string,
  ) {
    if (payload.serviceIds && payload.serviceIds.length === 0) {
      throw new BadRequestException(ServiceI18nKeys.errors.serviceIdsEmpty);
    }

    await this.helper.assertBusinessUnitExists(
      tenantId,
      payload.businessUnitId,
    );

    const serviceIdsArray = Array.isArray(payload.serviceIds)
      ? payload.serviceIds
      : [payload.serviceIds];

    try {
      await this.prisma.service_business_unit.createMany({
        data: serviceIdsArray.map((serviceId) => ({
          service_id: serviceId,
          business_unit_id: payload.businessUnitId,
          created_by: userId,
        })),
        skipDuplicates: true,
      });
    } catch (error) {
      console.error(error);

      throw new BadRequestException(I18nKeys.errors.invalidData);
    }
  }

  async associateUnits(
    tenantId: string,
    payload: AssociateUnitsDto,
    userId?: string,
  ) {
    if (payload.businessUnitIds && payload.businessUnitIds.length === 0) {
      throw new BadRequestException(ServiceI18nKeys.errors.serviceIdsEmpty);
    }

    await this.helper.assertServiceExists(tenantId, payload.serviceId);

    const businessUnitIdsArray = Array.isArray(payload.businessUnitIds)
      ? payload.businessUnitIds
      : [payload.businessUnitIds];

    try {
      await this.prisma.service_business_unit.createMany({
        data: businessUnitIdsArray.map((businessUnitId) => ({
          service_id: payload.serviceId,
          business_unit_id: businessUnitId,
          created_by: userId,
        })),
        skipDuplicates: true,
      });
    } catch (error) {
      console.error(error);

      throw new BadRequestException(I18nKeys.errors.invalidData);
    }
  }
}
