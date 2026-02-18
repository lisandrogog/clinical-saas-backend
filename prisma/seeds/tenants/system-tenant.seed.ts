import { AppUserRole, AppUserStatus, IdentificationType } from '@enums/index';
import { HashService, UtilsService } from '@modules/utils/services/index';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const hashService = new HashService();
const utils = new UtilsService();

export async function systemSeeder() {
  // Tenant Identification Type
  const identificationTypeTaxId =
    await prisma.identification_type.findUniqueOrThrow({
      where: { code: IdentificationType.TAX_ID },
    });

  const SYSTEM_TENANT_CODE = 'system_tenant';

  // Tenant: System Tenant
  const systemTenant = await prisma.tenant.upsert({
    where: { code: SYSTEM_TENANT_CODE },
    update: {},
    create: {
      business_name: utils.toPascalCase(SYSTEM_TENANT_CODE.replace('_', ' ')),
      code: SYSTEM_TENANT_CODE,
      active: true,
      identification_type_id: identificationTypeTaxId.id,
      identification_number: '0000000000',
      created_at: new Date(),
      readonly: true,
    },
  });

  // Role: System Admin
  const adminRole = await prisma.role.findFirst({
    where: {
      code: AppUserRole.SUPER_ADMIN,
      readonly: true,
      removed_at: null,
    },
  });

  if (!adminRole) {
    throw new Error(
      `Role with code ${AppUserRole.SUPER_ADMIN} not found. Please run the role seeder first.`,
    );
  }

  // Business Partner: System Admin
  const identificationTypeRif =
    await prisma.identification_type.findUniqueOrThrow({
      where: { code: IdentificationType.RIF },
    });

  let partnerSystem = await prisma.business_partner.findFirst({
    where: {
      tenant_id: systemTenant.id,
      email: 'admin@system.com',
      readonly: true,
    },
  });

  if (!partnerSystem) {
    partnerSystem = await prisma.business_partner.create({
      data: {
        tenant_id: systemTenant.id,
        first_name: 'System',
        last_name: 'Admin',
        email: 'admin@system.com',
        is_agent: true,
        identification_type_id: identificationTypeRif.id,
        identification_number: '010101010',
        readonly: true,
      },
    });
  }

  // User: System Admin
  const statusActive = await prisma.app_user_status.findUniqueOrThrow({
    where: { code: AppUserStatus.ACTIVE },
  });

  const SYSTEM_TENANT_USER_CODE = 'system_tenant_user';

  const appUser = await prisma.app_user.findFirst({
    where: {
      username: SYSTEM_TENANT_USER_CODE,
      business_partner_id: partnerSystem.id,
    },
  });

  if (!appUser) {
    const appUserPassword = await hashService.hashPassword('admin123');

    if (!appUserPassword) {
      throw new Error('Error al generar el hash de la contraseña.');
    }

    console.log('Password hash para admin123:', appUserPassword);

    await prisma.app_user.create({
      data: {
        business_partner_id: partnerSystem.id,
        username: SYSTEM_TENANT_USER_CODE,
        password_hash: appUserPassword,
        status_id: statusActive.id,
        role_id: adminRole.id,
        readonly: true,
      },
    });
  }

  console.log('✅ Super Usuario de sistema creado');
}
