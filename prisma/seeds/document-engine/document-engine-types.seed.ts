import { DocumentAction, DocumentStatus, DocumentType } from '@enums/index';
import { UtilsService } from '@modules/utils/services/utils.service';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const utils = new UtilsService();

export async function documentEngineTypesSeeder() {
  // Seed Document Actions
  for (const documentAction of Object.values(DocumentAction)) {
    const name = utils.toPascalCase(documentAction.replace('_', ' '));

    const index = Object.values(DocumentAction).indexOf(documentAction);

    await prisma.document_action.upsert({
      where: { code: documentAction },
      update: {
        name,
        readonly: true,
        item_order: index,
      },
      create: {
        name,
        code: documentAction,
        readonly: true,
        item_order: index,
      },
    });
  }

  // Seed Document Statuses
  const isPosted = (status: DocumentStatus) => {
    return [DocumentStatus.COMPLETED].includes(status);
  };

  const isEditable = (status: DocumentStatus) => {
    return [DocumentStatus.DRAFT, DocumentStatus.PENDING].includes(status);
  };
  const isFinal = (status: DocumentStatus) => {
    return [
      DocumentStatus.CANCELED,
      DocumentStatus.CLOSED,
      DocumentStatus.VOIDED,
    ].includes(status);
  };

  const allowBackwards = (status: DocumentStatus) => {
    return [DocumentStatus.SCHEDULED, DocumentStatus.IN_PROGRESS].includes(
      status,
    );
  };

  for (const documentStatus of Object.values(DocumentStatus)) {
    const name = utils.toPascalCase(documentStatus.replace('_', ' '));

    const index = Object.values(DocumentStatus).indexOf(documentStatus);

    await prisma.document_status.upsert({
      where: { code: documentStatus },
      update: {
        name,
        is_posted: isPosted(documentStatus),
        is_editable: isEditable(documentStatus),
        is_final: isFinal(documentStatus),
        allow_backwards: allowBackwards(documentStatus),
        readonly: true,
        item_order: index,
      },
      create: {
        name,
        code: documentStatus,
        is_posted: isPosted(documentStatus),
        is_editable: isEditable(documentStatus),
        is_final: isFinal(documentStatus),
        allow_backwards: allowBackwards(documentStatus),
        readonly: true,
        item_order: index,
      },
    });
  }

  // Seed Document Types
  for (const documentType of Object.values(DocumentType)) {
    const name = utils.toPascalCase(documentType.replace('_', ' '));

    await prisma.document_type.upsert({
      where: { code: documentType },
      update: {
        name,
        readonly: true,
      },
      create: {
        name,
        code: documentType,
        readonly: true,
      },
    });
  }

  console.log('✅ Document Engine Types Seeded');
}
