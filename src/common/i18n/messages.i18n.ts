export const MessagesI18n = {
  CREATE_SUCCESS: 'createSuccess',
  GET_ALL_SUCCESS: 'getAllSuccess',
  GET_BY_ID_SUCCESS: 'getByIdSuccess',
  GET_BY_CODE_SUCCESS: 'getByCodeSuccess',
  UPDATE_SUCCESS: 'updateSuccess',
  DISABLE_SUCCESS: 'disableSuccess',
  ENABLE_SUCCESS: 'enableSuccess',
  REMOVE_SUCCESS: 'removeSuccess',
} as const;

export type MessagesI18n = (typeof MessagesI18n)[keyof typeof MessagesI18n];
