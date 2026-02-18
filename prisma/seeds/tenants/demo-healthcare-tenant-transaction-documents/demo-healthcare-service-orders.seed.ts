import {
  AppUserRole,
  DocumentStatus,
  DocumentType,
  IdentificationType,
} from '@enums/index';
import { PrismaClient } from '@prisma/client';
import { uuidv7 } from 'uuidv7';

const prisma = new PrismaClient();

export async function demoHealthcareServiceOrdersSeeder() {
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

  // operator user
  const operatorUser = await prisma.app_user.findFirst({
    where: {
      business_partner: {
        tenant_id: demoHealthcareTenant.id,
        removed_at: null,
      },
      role: {
        code: AppUserRole.UNIT_OPERATOR,
        readonly: true,
      },
      removed_at: null,
    },
  });

  if (!operatorUser) {
    throw new Error(
      `Operator user not found for tenant ${demoHealthcareTenant.code}. Please run the user seeder first.`,
    );
  }

  // customer
  const CUSTOMER_PARTNER = 'CUSTOMER_PARTNER';
  const customerPartner = await prisma.business_partner.findFirst({
    where: {
      tenant_id: demoHealthcareTenant.id,
      identification_type_id: identificationTypeReference.id,
      identification_number: CUSTOMER_PARTNER,
      removed_at: null,
    },
  });

  if (!customerPartner) {
    throw new Error(
      `Customer partner not found for tenant ${demoHealthcareTenant.code}. Please run the partner seeder first.`,
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

  // Services
  const SERVICE_CLINICAL_CONSULT_CODE = 'CLINICAL_CONSULT';
  const SERVICE_LABORATORY_TEST_CODE = 'LABORATORY_TEST';

  const serviceConsultation = await prisma.service.findFirstOrThrow({
    where: {
      tenant_id: demoHealthcareTenant.id,
      code: SERVICE_CLINICAL_CONSULT_CODE,
      removed_at: null,
    },
  });

  const serviceLaboratoryTest = await prisma.service.findFirstOrThrow({
    where: {
      tenant_id: demoHealthcareTenant.id,
      code: SERVICE_LABORATORY_TEST_CODE,
      removed_at: null,
    },
  });

  // **************************************************************************
  // Create Service Orders
  // **************************************************************************
  const documentType = await prisma.document_type.findUniqueOrThrow({
    where: {
      code: DocumentType.SERVICE_ORDER,
    },
  });

  const documentStatusPending = await prisma.document_status.findUniqueOrThrow({
    where: {
      code: DocumentStatus.PENDING,
    },
  });

  const documentStatusScheduled =
    await prisma.document_status.findUniqueOrThrow({
      where: {
        code: DocumentStatus.SCHEDULED,
      },
    });

  const documentStatusCompleted =
    await prisma.document_status.findUniqueOrThrow({
      where: {
        code: DocumentStatus.COMPLETED,
      },
    });

  await prisma.service_order.create({
    data: {
      id: uuidv7(),
      tenant_id: demoHealthcareTenant.id,
      business_unit_id: consultUnit.id,
      agent_id: clinicalProvider.business_partner_id,
      customer_id: customerPartner.id,
      document_type_id: documentType.id,
      document_status_id: documentStatusPending.id,
      created_by: operatorUser.id,
      created_at: new Date(),
      service_order_item: {
        create: [
          {
            service_id: serviceConsultation.id,
            quantity: 1.0,
            unit_price: 42.0,
          },
        ],
      },
    },
  });

  await prisma.service_order.create({
    data: {
      id: uuidv7(),
      tenant_id: demoHealthcareTenant.id,
      business_unit_id: laboratoryUnit.id,
      agent_id: laboratoryProvider.business_partner_id,
      customer_id: customerPartner.id,
      document_type_id: documentType.id,
      document_status_id: documentStatusPending.id,
      created_by: operatorUser.id,
      created_at: new Date(),
      service_order_item: {
        create: [
          {
            service_id: serviceLaboratoryTest.id,
            quantity: 1.0,
            unit_price: 21.0,
          },
        ],
      },
    },
  });

  // Create scheduled date (1 week from now)
  const scheduledDate = new Date();
  scheduledDate.setDate(scheduledDate.getDate() + 7);

  await prisma.service_order.create({
    data: {
      id: uuidv7(),
      tenant_id: demoHealthcareTenant.id,
      business_unit_id: consultUnit.id,
      agent_id: clinicalProvider.business_partner_id,
      customer_id: customerPartner.id,
      document_type_id: documentType.id,
      document_status_id: documentStatusScheduled.id,
      scheduled_at: scheduledDate,
      created_by: operatorUser.id,
      created_at: new Date(),
      service_order_item: {
        create: [
          {
            service_id: serviceConsultation.id,
            quantity: 1.0,
            unit_price: 42.0,
          },
        ],
      },
    },
  });

  // Create updated date (1 day from now)
  const updatedDate = new Date();
  updatedDate.setDate(updatedDate.getDate() + 1);

  const serviceOrderCompleted = await prisma.service_order.create({
    data: {
      id: uuidv7(),
      tenant_id: demoHealthcareTenant.id,
      business_unit_id: consultUnit.id,
      agent_id: clinicalProvider.business_partner_id,
      customer_id: customerPartner.id,
      document_type_id: documentType.id,
      document_status_id: documentStatusCompleted.id,
      created_by: operatorUser.id,
      created_at: new Date(),
      updated_by: operatorUser.id,
      updated_at: updatedDate,
      service_order_item: {
        create: [
          {
            service_id: serviceConsultation.id,
            quantity: 1.0,
            unit_price: 41.0,
          },
        ],
      },
    },
  });

  await prisma.service_order_details.create({
    data: {
      id: uuidv7(),
      service_order_id: serviceOrderCompleted.id,
      symptoms: 'Fiebre, dolor de cabeza, dolor de garganta',
      diagnosis: 'Resfriado común',
      treatment_plan: 'Descanso, hidratación, paracetamol',
      prescription: {
        line_1: 'Paracetamol 500mg 2 cc, 3 veces al día',
        line_2: 'Cetirizina 10mg 1 cc, 1 vez al día',
      },
      start_at: scheduledDate,
      end_at: updatedDate,
      created_by: operatorUser.id,
      created_at: new Date(),
      updated_by: operatorUser.id,
      updated_at: updatedDate,
    },
  });

  console.log('✅ Service orders created successfully');
}
