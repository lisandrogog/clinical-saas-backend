import { DocumentAction, DocumentStatus, DocumentType } from '@enums/index';
import { UtilsService } from '@modules/utils/services/utils.service';
import { PrismaClient } from '@prisma/client';
import { uuidv7 } from 'uuidv7';

const prisma = new PrismaClient();

const utils = new UtilsService();

export async function documentEngineServiceOrderSeeder() {
  const existingServiceOrderEngine = await prisma.document_engine.findFirst({
    where: {
      code: DocumentType.SERVICE_ORDER,
      is_default: true,
    },
  });

  if (existingServiceOrderEngine) {
    console.log(
      '⚠️  Service order document engine already exists, skipping seeding',
    );
    return;
  }

  const documentStatusDraft = await prisma.document_status.findUniqueOrThrow({
    where: { code: DocumentStatus.DRAFT },
  });

  const documentStatuses = await prisma.document_status.findMany();

  const documentActions = await prisma.document_action.findMany();

  const documentTypeServiceOrder = await prisma.document_type.findUniqueOrThrow(
    {
      where: { code: DocumentType.SERVICE_ORDER },
    },
  );

  const id = uuidv7();

  const name =
    utils.toPascalCase(DocumentType.SERVICE_ORDER.replace('_', ' ')) +
    ' Document Engine';

  const orderEngine = await prisma.document_engine.create({
    data: {
      id,
      code: DocumentType.SERVICE_ORDER,
      name,
      document_type_id: documentTypeServiceOrder.id,
      initial_state_id: documentStatusDraft.id,
      is_default: true,
    },
  });

  const transitions = [
    // action confirm (draft -> pending)
    {
      actionCode: DocumentAction.CONFIRM,
      from: DocumentStatus.DRAFT,
      to: DocumentStatus.PENDING,
    },
    // action schedule (draft/pending -> scheduled)
    {
      actionCode: DocumentAction.SCHEDULE,
      from: DocumentStatus.DRAFT,
      to: DocumentStatus.SCHEDULED,
    },
    {
      actionCode: DocumentAction.SCHEDULE,
      from: DocumentStatus.PENDING,
      to: DocumentStatus.SCHEDULED,
    },
    // action start (pending/scheduled -> in_progress)
    {
      actionCode: DocumentAction.START,
      from: DocumentStatus.PENDING,
      to: DocumentStatus.IN_PROGRESS,
    },
    {
      actionCode: DocumentAction.START,
      from: DocumentStatus.SCHEDULED,
      to: DocumentStatus.IN_PROGRESS,
    },
    // action complete (in_progress -> completed)
    {
      actionCode: DocumentAction.COMPLETE,
      from: DocumentStatus.IN_PROGRESS,
      to: DocumentStatus.COMPLETED,
    },
    // action close (completed -> closed)
    {
      actionCode: DocumentAction.CLOSE,
      from: DocumentStatus.COMPLETED,
      to: DocumentStatus.CLOSED,
    },
    // action cancel (draft/pending/scheduled -> canceled)
    {
      actionCode: DocumentAction.CANCEL,
      from: DocumentStatus.DRAFT,
      to: DocumentStatus.CANCELED,
    },
    {
      actionCode: DocumentAction.CANCEL,
      from: DocumentStatus.PENDING,
      to: DocumentStatus.CANCELED,
    },
    {
      actionCode: DocumentAction.CANCEL,
      from: DocumentStatus.SCHEDULED,
      to: DocumentStatus.CANCELED,
    },
  ];

  for (const transition of transitions) {
    const fromStatus = documentStatuses.find(
      (s) => s.code === `${transition.from}`,
    );

    const toStatus = documentStatuses.find(
      (s) => s.code === `${transition.to}`,
    );

    if (!fromStatus || !toStatus) {
      console.warn(
        `⚠️  Estado no encontrado para transición: ${transition.actionCode} - from ${transition.from} to ${transition.to}`,
      );
      continue;
    }

    const action = documentActions.find(
      (a) => a.code === `${transition.actionCode}`,
    );

    if (!action) {
      console.warn(
        `⚠️  Acción no encontrada para transición: ${transition.actionCode} - from ${transition.from} to ${transition.to}`,
      );
      continue;
    }

    await prisma.document_engine_item.create({
      data: {
        document_engine_id: orderEngine.id,
        document_action_id: action.id,
        from_state_id: fromStatus.id,
        to_state_id: toStatus.id,
      },
    });
  }
  console.log('✅ Service Order Document Engine Seeded');
}
