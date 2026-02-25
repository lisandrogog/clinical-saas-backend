export const DocumentAction = {
  CONFIRM: 'confirm',
  SCHEDULE: 'schedule',
  RE_SCHEDULE: 're_schedule',
  START: 'start',
  CANCEL: 'cancel',
  COMPLETE: 'complete',
  CLOSE: 'close',
  VOID: 'void',
} as const;

export type DocumentAction =
  (typeof DocumentAction)[keyof typeof DocumentAction];
