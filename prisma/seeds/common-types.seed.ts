import { AppUserStatus, IdentificationType } from '@enums/index';
import { UtilsService } from '@modules/utils/services/utils.service';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const utils = new UtilsService();

export async function commonTypesSeeder() {
  for (const identificationTypeCode of Object.values(IdentificationType)) {
    const name = utils.toPascalCase(identificationTypeCode.replace('_', ' '));

    await prisma.identification_type.upsert({
      where: { code: identificationTypeCode },
      update: {
        name,
        readonly: true,
      },
      create: {
        name,
        code: identificationTypeCode,
        readonly: true,
      },
    });
  }

  for (const appUserStatusCode of Object.values(AppUserStatus)) {
    const name = utils.toPascalCase(appUserStatusCode.replace('_', ' '));

    const itemOrder =
      Object.values(AppUserStatus).indexOf(appUserStatusCode) + 1;

    await prisma.app_user_status.upsert({
      where: { code: appUserStatusCode },
      update: {
        name,
        item_order: itemOrder,
      },
      create: {
        name,
        code: appUserStatusCode,
        item_order: itemOrder,
      },
    });
  }

  console.log('✅ Common types seeded successfully.');
}
