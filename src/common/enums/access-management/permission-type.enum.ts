export const PermissionType = {
  READ_ONLY: 'read_only',
  READ_WRITE: 'read_write',
  FULL_ACCESS: 'read_update',
  ADMIN_ACCESS: 'full_access',
} as const;

export type PermissionType =
  (typeof PermissionType)[keyof typeof PermissionType];
