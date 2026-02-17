import { PrismaClient } from '@prisma/client';
import { uuidv7 } from 'uuidv7';

const prisma = new PrismaClient();

export async function demoHealthcareServicesSeeder() {
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

  // **************************************************************************
  // Create Service Categories
  // **************************************************************************

  const SERVICE_CATEGORY_CLINICAL_CODE = 'CLINICAL';
  const SERVICE_CATEGORY_LABORATORY_CODE = 'LABORATORY';

  let serviceCategoryClinical = await prisma.service_category.findFirst({
    where: {
      tenant_id: demoHealthcareTenant.id,
      code: SERVICE_CATEGORY_CLINICAL_CODE,
    },
  });

  if (!serviceCategoryClinical) {
    serviceCategoryClinical = await prisma.service_category.create({
      data: {
        id: uuidv7(),
        tenant_id: demoHealthcareTenant.id,
        code: SERVICE_CATEGORY_CLINICAL_CODE,
        name: 'Servicios Clínicos',
        active: true,
      },
    });
  }

  let serviceCategoryLaboratory = await prisma.service_category.findFirst({
    where: {
      tenant_id: demoHealthcareTenant.id,
      code: SERVICE_CATEGORY_LABORATORY_CODE,
    },
  });

  if (!serviceCategoryLaboratory) {
    serviceCategoryLaboratory = await prisma.service_category.create({
      data: {
        id: uuidv7(),
        tenant_id: demoHealthcareTenant.id,
        code: SERVICE_CATEGORY_LABORATORY_CODE,
        name: 'Servicios de Laboratorio',
        active: true,
      },
    });
  }

  // **************************************************************************
  // Create Services
  // **************************************************************************

  const SERVICE_CLINICAL_CONSULT_CODE = 'CLINICAL_CONSULT';

  let serviceConsultation = await prisma.service.findFirst({
    where: {
      tenant_id: demoHealthcareTenant.id,
      code: SERVICE_CLINICAL_CONSULT_CODE,
    },
  });

  if (!serviceConsultation) {
    serviceConsultation = await prisma.service.create({
      data: {
        id: uuidv7(),
        tenant_id: demoHealthcareTenant.id,
        code: SERVICE_CLINICAL_CONSULT_CODE,
        name: 'Consulta Clínica',
        base_price: 40.0,
        base_cost: 10.0,
        active: true,
        service_category_id: serviceCategoryClinical.id,
      },
    });
  }

  const SERVICE_LABORATORY_TEST_CODE = 'LABORATORY_TEST';

  let serviceLaboratoryTest = await prisma.service.findFirst({
    where: {
      tenant_id: demoHealthcareTenant.id,
      code: SERVICE_LABORATORY_TEST_CODE,
    },
  });

  if (!serviceLaboratoryTest) {
    serviceLaboratoryTest = await prisma.service.create({
      data: {
        id: uuidv7(),
        tenant_id: demoHealthcareTenant.id,
        code: SERVICE_LABORATORY_TEST_CODE,
        name: 'Prueba de Laboratorio',
        base_price: 20.0,
        base_cost: 5.0,
        active: true,
        service_category_id: serviceCategoryLaboratory.id,
      },
    });
  }

  // **************************************************************************
  // Create Service Offerings By Business Units
  // **************************************************************************

  for (const businessUnit of businessUnits) {
    const index = businessUnits.indexOf(businessUnit) + 1;

    await prisma.service_business_unit.upsert({
      where: {
        service_id_business_unit_id: {
          business_unit_id: businessUnit.id,
          service_id: serviceConsultation.id,
        },
      },
      update: {
        price: serviceConsultation.base_price.plus(index),
        cost: serviceConsultation.base_cost.plus(index),
        active: true,
      },
      create: {
        business_unit_id: businessUnit.id,
        service_id: serviceConsultation.id,
        price: serviceConsultation.base_price.plus(index),
        cost: serviceConsultation.base_cost.plus(index),
        active: true,
      },
    });

    await prisma.service_business_unit.upsert({
      where: {
        service_id_business_unit_id: {
          business_unit_id: businessUnit.id,
          service_id: serviceLaboratoryTest.id,
        },
      },
      update: {
        price: serviceLaboratoryTest.base_price.plus(index),
        cost: serviceLaboratoryTest.base_cost.plus(index),
        active: true,
      },
      create: {
        business_unit_id: businessUnit.id,
        service_id: serviceLaboratoryTest.id,
        price: serviceLaboratoryTest.base_price.plus(index),
        cost: serviceLaboratoryTest.base_cost.plus(index),
        active: true,
      },
    });
  }
}
