export const AppUserRole = {
  SUPER_ADMIN: 'super_admin',
  TENANT_ADMIN: 'tenant_admin',
  UNIT_ADMIN: 'unit_admin',
  UNIT_OPERATOR: 'unit_operator',
} as const;

export type AppUserRole = (typeof AppUserRole)[keyof typeof AppUserRole];
