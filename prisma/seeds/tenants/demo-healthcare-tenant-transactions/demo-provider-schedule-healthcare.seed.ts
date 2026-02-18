import { DayOfWeek, IdentificationType } from '@enums/index';
import { PrismaClient } from '@prisma/client';
import { UtilsService } from '@modules/utils/services/utils.service';

const prisma = new PrismaClient();
const utils = new UtilsService();

export async function demoHealthcareProviderScheduleSeeder() {
  // get identification type reference
  const identificationTypeReference =
    await prisma.identification_type.findUniqueOrThrow({
      where: { code: IdentificationType.REFERENCE },
    });

  // get tenant
  const DEMO_HEALTHCARE_TENANT_CODE = 'demo_healthcare';

  const demoHealthcareTenant = await prisma.tenant.findUniqueOrThrow({
    where: { code: DEMO_HEALTHCARE_TENANT_CODE },
  });

  // get business units
  const businessUnits = await prisma.business_unit.findMany({
    where: { tenant_id: demoHealthcareTenant.id },
  });

  if (businessUnits.length === 0) {
    throw new Error(
      `No business units found for tenant ${demoHealthcareTenant.code}. Please run the tenant seeder first.`,
    );
  }

  // units
  const consultUnit = businessUnits.find(
    (businessUnit) => businessUnit.code === 'CST-CONSULT',
  );

  const laboratoryUnit = businessUnits.find(
    (businessUnit) => businessUnit.code === 'CST-LAB',
  );

  if (!consultUnit || !laboratoryUnit) {
    throw new Error(
      `Units not found for tenant ${demoHealthcareTenant.code}. Please run the tenant seeder first.`,
    );
  }

  // providers
  const CLINICAL_PROVIDER_PARTNER = 'CLINICAL_PROVIDER_PARTNER';
  const LABORATORY_PROVIDER_PARTNER = 'LABORATORY_PROVIDER_PARTNER';

  const clinicalProvider = await prisma.service_provider.findFirst({
    where: {
      tenant_id: demoHealthcareTenant.id,
      business_partner: {
        tenant_id: demoHealthcareTenant.id,
        identification_type_id: identificationTypeReference.id,
        identification_number: CLINICAL_PROVIDER_PARTNER,
        removed_at: null,
      },
    },
  });

  const laboratoryProvider = await prisma.service_provider.findFirst({
    where: {
      tenant_id: demoHealthcareTenant.id,
      business_partner: {
        tenant_id: demoHealthcareTenant.id,
        identification_type_id: identificationTypeReference.id,
        identification_number: LABORATORY_PROVIDER_PARTNER,
        removed_at: null,
      },
    },
  });

  if (!clinicalProvider || !laboratoryProvider) {
    throw new Error(
      `Providers not found for tenant ${demoHealthcareTenant.code}. Please run the provider seeder first.`,
    );
  }

  // schedule
  for (const dayOfWeek of Object.values(DayOfWeek).filter(
    (value) => typeof value === 'number',
  ) as DayOfWeek[]) {
    if (dayOfWeek === DayOfWeek.SATURDAY || dayOfWeek === DayOfWeek.SUNDAY) {
      continue;
    }

    // clinical
    await prisma.service_provider_schedule.create({
      data: {
        tenant_id: demoHealthcareTenant.id,
        business_unit_id: consultUnit.id,
        service_provider_id: clinicalProvider.id,
        day_of_week: dayOfWeek,
        start_time: utils.formatTimeToPrisma('08:00'),
        end_time: utils.formatTimeToPrisma('12:00'),
        slot_duration_minutes: 60,
      },
    });

    await prisma.service_provider_schedule.create({
      data: {
        tenant_id: demoHealthcareTenant.id,
        business_unit_id: consultUnit.id,
        service_provider_id: clinicalProvider.id,
        day_of_week: dayOfWeek,
        start_time: utils.formatTimeToPrisma('14:00'),
        end_time: utils.formatTimeToPrisma('18:00'),
        slot_duration_minutes: 60,
      },
    });

    // laboratory
    await prisma.service_provider_schedule.create({
      data: {
        tenant_id: demoHealthcareTenant.id,
        business_unit_id: laboratoryUnit.id,
        service_provider_id: laboratoryProvider.id,
        day_of_week: dayOfWeek,
        start_time: utils.formatTimeToPrisma('08:00'),
        end_time: utils.formatTimeToPrisma('12:00'),
        slot_duration_minutes: 60,
      },
    });

    await prisma.service_provider_schedule.create({
      data: {
        tenant_id: demoHealthcareTenant.id,
        business_unit_id: laboratoryUnit.id,
        service_provider_id: laboratoryProvider.id,
        day_of_week: dayOfWeek,
        start_time: utils.formatTimeToPrisma('14:00'),
        end_time: utils.formatTimeToPrisma('18:00'),
        slot_duration_minutes: 60,
      },
    });
  }
}
