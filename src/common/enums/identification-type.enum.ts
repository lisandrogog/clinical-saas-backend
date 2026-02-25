export const IdentificationType = {
  PERSONAL_ID: 'personal_id',
  TAX_ID: 'tax_id',
  PASSPORT: 'passport',
  DRIVER_LICENSE: 'driver_license',
  RUT: 'rut',
  NIT: 'nit',
  RIF: 'rif',
  REFERENCE: 'reference',
} as const;

export type IdentificationType =
  (typeof IdentificationType)[keyof typeof IdentificationType];
