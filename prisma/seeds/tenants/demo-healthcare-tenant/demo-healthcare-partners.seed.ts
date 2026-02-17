import { IdentificationType } from '@enums/index';
import { PrismaClient, service_provider } from '@prisma/client';
import { uuidv7 } from 'uuidv7';

const prisma = new PrismaClient();

export async function demoHealthcarePartnersSeeder() {
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

  // **************************************************************************
  // Create Partners
  // **************************************************************************

  const CUSTOMER_PARTNER = 'CUSTOMER_PARTNER';
  const CLINICAL_PROVIDER_PARTNER = 'CLINICAL_PROVIDER_PARTNER';
  const LABORATORY_PROVIDER_PARTNER = 'LABORATORY_PROVIDER_PARTNER';

  let customerPartner = await prisma.business_partner.findFirst({
    where: {
      tenant_id: demoHealthcareTenant.id,
      identification_type_id: identificationTypeReference.id,
      identification_number: CUSTOMER_PARTNER,
    },
  });

  if (!customerPartner) {
    customerPartner = await prisma.business_partner.create({
      data: {
        id: uuidv7(),
        tenant_id: demoHealthcareTenant.id,
        identification_type_id: identificationTypeReference.id,
        identification_number: CUSTOMER_PARTNER,
        first_name: 'Customer',
        last_name: 'Partner',
        email: 'customer.partner@healthcare.com',
        is_customer: true,
      },
    });
  }

  let clinicalProviderPartner = await prisma.business_partner.findFirst({
    where: {
      tenant_id: demoHealthcareTenant.id,
      identification_type_id: identificationTypeReference.id,
      identification_number: CLINICAL_PROVIDER_PARTNER,
    },
  });

  if (!clinicalProviderPartner) {
    clinicalProviderPartner = await prisma.business_partner.create({
      data: {
        id: uuidv7(),
        tenant_id: demoHealthcareTenant.id,
        identification_type_id: identificationTypeReference.id,
        identification_number: CLINICAL_PROVIDER_PARTNER,
        first_name: 'Clinical',
        last_name: 'Provider',
        email: 'clinical.provider.partner@healthcare.com',
        is_supplier: true,
      },
    });
  }

  let laboratoryProviderPartner = await prisma.business_partner.findFirst({
    where: {
      tenant_id: demoHealthcareTenant.id,
      identification_type_id: identificationTypeReference.id,
      identification_number: LABORATORY_PROVIDER_PARTNER,
    },
  });

  if (!laboratoryProviderPartner) {
    laboratoryProviderPartner = await prisma.business_partner.create({
      data: {
        id: uuidv7(),
        tenant_id: demoHealthcareTenant.id,
        identification_type_id: identificationTypeReference.id,
        identification_number: LABORATORY_PROVIDER_PARTNER,
        first_name: 'Laboratory',
        last_name: 'Provider',
        email: 'laboratory.provider.partner@healthcare.com',
        is_supplier: true,
      },
    });
  }

  // **************************************************************************
  // Create Business Partner Business Unit
  // **************************************************************************

  for (const partner of [
    customerPartner,
    clinicalProviderPartner,
    laboratoryProviderPartner,
  ]) {
    await prisma.business_partner_business_unit.createMany({
      data: businessUnits.map((businessUnit) => {
        return {
          business_unit_id: businessUnit.id,
          business_partner_id: partner.id,
        };
      }),
    });
  }

  // **************************************************************************
  // Associate partner providers to service providers
  // **************************************************************************

  const providers: service_provider[] = [];

  for (const provider of [clinicalProviderPartner, laboratoryProviderPartner]) {
    const index =
      [clinicalProviderPartner, laboratoryProviderPartner].indexOf(provider) +
      1;

    const serviceProvider = await prisma.service_provider.create({
      data: {
        id: uuidv7(),
        tenant_id: demoHealthcareTenant.id,
        business_partner_id: provider.id,
        extra_data: {
          specialty: 'General',
          register_number: `M.P.P.S.: 56789 - C.M.: 00-${index}`,
        },
      },
    });

    providers.push(serviceProvider);
  }

  // **************************************************************************
  // Associate Services to Service Providers
  // **************************************************************************

  // services
  const SERVICE_CLINICAL_CONSULT_CODE = 'CLINICAL_CONSULT';
  const SERVICE_LABORATORY_TEST_CODE = 'LABORATORY_TEST';

  const serviceConsultation = await prisma.service.findFirst({
    where: {
      tenant_id: demoHealthcareTenant.id,
      code: SERVICE_CLINICAL_CONSULT_CODE,
    },
  });

  const serviceLaboratoryTest = await prisma.service.findFirst({
    where: {
      tenant_id: demoHealthcareTenant.id,
      code: SERVICE_LABORATORY_TEST_CODE,
    },
  });

  if (!serviceConsultation || !serviceLaboratoryTest) {
    throw new Error(
      `Services not found for tenant ${demoHealthcareTenant.code}. Please run the service seeder first.`,
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
  const providerConsult = providers.find(
    (provider) => provider.business_partner_id === clinicalProviderPartner.id,
  );

  const providerLaboratory = providers.find(
    (provider) => provider.business_partner_id === laboratoryProviderPartner.id,
  );

  if (!providerConsult || !providerLaboratory) {
    throw new Error(
      `Providers not found for tenant ${demoHealthcareTenant.code}. Please run the provider seeder first.`,
    );
  }

  // service provider services
  await prisma.service_provider_service.createMany({
    data: [
      {
        tenant_id: demoHealthcareTenant.id,
        service_id: serviceConsultation.id,
        service_provider_id: providerConsult.id,
        business_unit_id: consultUnit.id,
      },
      {
        tenant_id: demoHealthcareTenant.id,
        service_id: serviceLaboratoryTest.id,
        service_provider_id: providerLaboratory.id,
        business_unit_id: laboratoryUnit.id,
      },
    ],
  });

  console.log(
    `✅ Partners for tenant ${demoHealthcareTenant.code} seeded successfully.`,
  );
}
