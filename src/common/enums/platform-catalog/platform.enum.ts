export const Platform = {
  CORE_ERP: 'core_erp',
  CORE_CRM: 'core_crm',
  CORE_HEALTHCARE: 'core_healthcare',
} as const;

export type Platform = (typeof Platform)[keyof typeof Platform];
