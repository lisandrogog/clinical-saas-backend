export const ErrorsI18n = {
  INVALID_DATA: 'invalidData',
  NOT_FOUND: 'notFound',
  UNAUTHORIZED: 'unauthorized',
  FORBIDDEN: 'forbidden',
  INTERNAL_SERVER_ERROR: 'internalServerError',
  ALREADY_EXISTS: 'alreadyExists',
} as const;

export type ErrorsI18n = (typeof ErrorsI18n)[keyof typeof ErrorsI18n];
