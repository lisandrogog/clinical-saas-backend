export const DocumentType = {
  SERVICE_ORDER: 'service_order',
} as const;

export type DocumentType = (typeof DocumentType)[keyof typeof DocumentType];
