export const LabelsI18n = {
  CREATE_SUMMARY: 'createSummary',
  GET_ALL_SUMMARY: 'getAllSummary',
  GET_BY_ID_SUMMARY: 'getByIdSummary',
  GET_BY_CODE_SUMMARY: 'getByCodeSummary',
  UPDATE_SUMMARY: 'updateSummary',
  DISABLE_SUMMARY: 'disableSummary',
  ENABLE_SUMMARY: 'enableSummary',
  REMOVE_SUMMARY: 'removeSummary',
  USER_ID_HEADER: 'userIdHeader',
} as const;

export type LabelsI18n = (typeof LabelsI18n)[keyof typeof LabelsI18n];
