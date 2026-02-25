export const AppUserStatus = {
  PENDING: 'pending',
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  SUSPENDED: 'suspended',
  BLOCKED: 'blocked',
  EXPIRED: 'expired',
} as const;

export type AppUserStatus = (typeof AppUserStatus)[keyof typeof AppUserStatus];
