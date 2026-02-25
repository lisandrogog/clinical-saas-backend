import { ErrorsI18n, MessagesI18n } from '@i18n/index';

export const SubModuleKeys = {
  moduleKey: 'serviceProvider',
  entityKey: 'providerService',
  i18nKey: 'serviceProvider.providerService',
} as const;

export const I18nKeys = {
  errors: {
    notFound: `${SubModuleKeys.i18nKey}.${ErrorsI18n.NOT_FOUND}`,
    invalidData: `${SubModuleKeys.i18nKey}.${ErrorsI18n.INVALID_DATA}`,
    alreadyExists: `${SubModuleKeys.i18nKey}.${ErrorsI18n.ALREADY_EXISTS}`,
    serviceNotFound: `${SubModuleKeys.i18nKey}.${ErrorsI18n.SERVICE_NOT_FOUND}`,
  },
  messages: {
    createSuccess: `${SubModuleKeys.i18nKey}.${MessagesI18n.CREATE_SUCCESS}`,
    getAllSuccess: `${SubModuleKeys.i18nKey}.${MessagesI18n.GET_ALL_SUCCESS}`,
    getByIdSuccess: `${SubModuleKeys.i18nKey}.${MessagesI18n.GET_BY_ID_SUCCESS}`,
    updateSuccess: `${SubModuleKeys.i18nKey}.${MessagesI18n.UPDATE_SUCCESS}`,
    disableSuccess: `${SubModuleKeys.i18nKey}.${MessagesI18n.DISABLE_SUCCESS}`,
    enableSuccess: `${SubModuleKeys.i18nKey}.${MessagesI18n.ENABLE_SUCCESS}`,
    removeSuccess: `${SubModuleKeys.i18nKey}.${MessagesI18n.REMOVE_SUCCESS}`,
    upsertSuccess: `${SubModuleKeys.i18nKey}.${MessagesI18n.UPSERT_SUCCESS}`,
  },
} as const;
