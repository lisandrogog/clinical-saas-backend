export const DocumentStatus = {
  DRAFT: 'draft',
  PENDING: 'pending',
  SCHEDULED: 'scheduled',
  IN_PROGRESS: 'in_progress',
  CANCELED: 'canceled',
  COMPLETED: 'completed',
  CLOSED: 'closed',
  VOIDED: 'voided',
} as const;

export type DocumentStatus =
  (typeof DocumentStatus)[keyof typeof DocumentStatus];
