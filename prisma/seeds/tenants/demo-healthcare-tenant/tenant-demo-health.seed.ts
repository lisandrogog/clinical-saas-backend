import { IdentificationType } from '@enums/index';
import { UtilsService } from '@modules/utils/services/index';
import { PrismaClient } from '@prisma/client';
import { uuidv7 } from 'uuidv7';

const prisma = new PrismaClient();
const utils = new UtilsService();

export async function demoHealthcareTenantSeeder() {
  const identificationTypeRif =
    await prisma.identification_type.findUniqueOrThrow({
      where: { code: IdentificationType.RIF },
    });

  const DEMO_HEALTHCARE_TENANT_CODE = 'demo_healthcare';

  await prisma.tenant.upsert({
    where: { code: DEMO_HEALTHCARE_TENANT_CODE },
    update: {},
    create: {
      id: uuidv7(),
      business_name: utils.toPascalCase(
        DEMO_HEALTHCARE_TENANT_CODE.replace('_', ' '),
      ),
      code: DEMO_HEALTHCARE_TENANT_CODE,
      active: true,
      identification_type_id: identificationTypeRif.id,
      identification_number: '0123456789',
      created_at: new Date(),
      business_unit: {
        create: [
          {
            id: uuidv7(),
            business_name: 'Consultorios Médicos',
            code: 'CST-CONSULT',
          },
          {
            id: uuidv7(),
            business_name: 'Laboratorio Clínico',
            code: 'CST-LAB',
          },
        ],
      },
    },
  });

  console.log(`✅ Tenant ${DEMO_HEALTHCARE_TENANT_CODE} seeded successfully.`);
}
