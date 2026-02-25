export const AccessScope = {
  OWN_RECORDS: 'own_records',
  UNIT_RECORDS: 'unit_records',
  TENANT_RECORDS: 'tenant_records',
  ALL_RECORDS: 'all_records',
} as const;

export type AccessScope = (typeof AccessScope)[keyof typeof AccessScope];
