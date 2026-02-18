import { AppUserRole, AppUserStatus, IdentificationType } from '@enums/index';
import { HashService } from '@modules/utils/services/index';
import { PrismaClient } from '@prisma/client';
import { uuidv7 } from 'uuidv7';

const prisma = new PrismaClient();
const hashService = new HashService();

export async function demoHealthcareUsersSeeder() {
  // get identification type rif
  const identificationTypeRif =
    await prisma.identification_type.findUniqueOrThrow({
      where: { code: IdentificationType.RIF },
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

  // BusinessPartner admin_tenant
  let partnerAdminTenant = await prisma.business_partner.findFirst({
    where: {
      tenant_id: demoHealthcareTenant.id,
      email: 'admin.tenant@healthcare.com',
    },
  });

  if (!partnerAdminTenant) {
    partnerAdminTenant = await prisma.business_partner.create({
      data: {
        tenant_id: demoHealthcareTenant.id,
        first_name: 'Tenant',
        last_name: 'Admin',
        email: 'admin.tenant@healthcare.com',
        is_agent: true,
        identification_type_id: identificationTypeRif.id,
        identification_number: '012345678-1',
      },
    });
  }
  // businessPartner unit tenant
  let partnerAdminUnit = await prisma.business_partner.findFirst({
    where: {
      tenant_id: demoHealthcareTenant.id,
      email: 'admin.unit@healthcare.com',
    },
  });

  if (!partnerAdminUnit) {
    partnerAdminUnit = await prisma.business_partner.create({
      data: {
        tenant_id: demoHealthcareTenant.id,
        first_name: 'Unit',
        last_name: 'Admin',
        email: 'admin.unit@healthcare.com',
        is_agent: true,
        identification_type_id: identificationTypeRif.id,
        identification_number: '012345678-2',
      },
    });
  }
  // business partner unit operator
  let partnerOperatorUnit = await prisma.business_partner.findFirst({
    where: {
      tenant_id: demoHealthcareTenant.id,
      email: 'operator.unit@healthcare.com',
    },
  });

  if (!partnerOperatorUnit) {
    partnerOperatorUnit = await prisma.business_partner.create({
      data: {
        tenant_id: demoHealthcareTenant.id,
        first_name: 'Unit',
        last_name: 'Operator',
        email: 'operator.unit@healthcare.com',
        is_agent: true,
        identification_type_id: identificationTypeRif.id,
        identification_number: '012345678-3',
      },
    });
  }

  // asociar business parner's a business units - Admin Unit/Operator Uniot
  for (const partner of [partnerAdminUnit, partnerOperatorUnit]) {
    await prisma.business_partner_business_unit.createMany({
      data: businessUnits.map((businessUnit) => {
        return {
          business_unit_id: businessUnit.id,
          business_partner_id: partner.id,
        };
      }),
      skipDuplicates: true,
    });
  }

  // **************************************************************************
  // Create Users
  // **************************************************************************

  // get status
  const statusActive = await prisma.app_user_status.findUniqueOrThrow({
    where: { code: AppUserStatus.ACTIVE },
  });

  // admin tenant user
  let appUserTenantAdmin = await prisma.app_user.findFirst({
    where: {
      business_partner_id: partnerAdminTenant.id,
    },
  });

  if (!appUserTenantAdmin) {
    const passwordHash = await hashService.hashPassword('Admin123.');

    if (!passwordHash) {
      throw new Error('Error al generar el hash de la contraseña.');
    }

    const role = await prisma.role.findFirst({
      where: {
        code: AppUserRole.TENANT_ADMIN,
      },
    });

    if (!role) {
      throw new Error(
        `Role with code ${AppUserRole.TENANT_ADMIN} not found. Please run the role seeder first.`,
      );
    }

    appUserTenantAdmin = await prisma.app_user.create({
      data: {
        id: uuidv7(),
        password_hash: passwordHash,
        role_id: role.id,
        status_id: statusActive.id,
        username: 'admin.tenant',
        business_partner_id: partnerAdminTenant.id,
      },
    });
  }

  // admin unit user
  let appUserUnitAdmin = await prisma.app_user.findFirst({
    where: {
      business_partner_id: partnerAdminUnit.id,
    },
  });

  if (!appUserUnitAdmin) {
    const passwordHash = await hashService.hashPassword('Unit123.');

    if (!passwordHash) {
      throw new Error('Error al generar el hash de la contraseña.');
    }

    const role = await prisma.role.findFirst({
      where: {
        code: AppUserRole.UNIT_ADMIN,
      },
    });

    if (!role) {
      throw new Error(
        `Role with code ${AppUserRole.UNIT_ADMIN} not found. Please run the role seeder first.`,
      );
    }

    appUserUnitAdmin = await prisma.app_user.create({
      data: {
        id: uuidv7(),
        password_hash: passwordHash,
        role_id: role.id,
        status_id: statusActive.id,
        username: 'admin.unit',
        business_partner_id: partnerAdminUnit.id,
      },
    });
  }

  // operator unit user
  let appUserUnitOperator = await prisma.app_user.findFirst({
    where: {
      business_partner_id: partnerOperatorUnit.id,
    },
  });

  if (!appUserUnitOperator) {
    const passwordHash = await hashService.hashPassword('Opera123.');

    if (!passwordHash) {
      throw new Error('Error al generar el hash de la contraseña.');
    }

    const role = await prisma.role.findFirst({
      where: {
        code: AppUserRole.UNIT_OPERATOR,
      },
    });

    if (!role) {
      throw new Error(
        `Role with code ${AppUserRole.UNIT_OPERATOR} not found. Please run the role seeder first.`,
      );
    }

    appUserUnitOperator = await prisma.app_user.create({
      data: {
        id: uuidv7(),
        password_hash: passwordHash,
        role_id: role.id,
        status_id: statusActive.id,
        username: 'operator.unit',
        business_partner_id: partnerOperatorUnit.id,
      },
    });
  }

  // AppUser business Partner relation
  for (const appUser of [appUserUnitAdmin, appUserUnitOperator]) {
    for (const businessUnit of businessUnits) {
      const appUserBusinessUnit = await prisma.app_user_business_unit.findFirst(
        {
          where: {
            app_user_id: appUser.id,
            business_unit_id: businessUnit.id,
          },
        },
      );

      if (appUserBusinessUnit) {
        continue;
      }

      await prisma.app_user_business_unit.create({
        data: {
          app_user_id: appUser.id,
          business_unit_id: businessUnit.id,
        },
      });
    }
  }

  console.log(
    `✅ Users for tenant ${demoHealthcareTenant.code} created successfully.`,
  );
}
