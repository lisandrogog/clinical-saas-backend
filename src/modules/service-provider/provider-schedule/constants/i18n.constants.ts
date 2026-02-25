import { ErrorsI18n, MessagesI18n } from '@i18n/index';

export const SubModuleKeys = {
  moduleKey: 'serviceProvider',
  entityKey: 'providerSchedule',
  i18nKey: 'serviceProvider.providerSchedule',
} as const;

export const I18nKeys = {
  errors: {
    notFound: `${SubModuleKeys.i18nKey}.${ErrorsI18n.NOT_FOUND}`,
    invalidData: `${SubModuleKeys.i18nKey}.${ErrorsI18n.INVALID_DATA}`,
    alreadyExists: `${SubModuleKeys.i18nKey}.${ErrorsI18n.ALREADY_EXISTS}`,
  },
  messages: {
    upsertSuccess: `${SubModuleKeys.i18nKey}.upsertSuccess`,
    getByUnitSuccess: `${SubModuleKeys.i18nKey}.getByUnitSuccess`,
    removeSuccess: `${SubModuleKeys.i18nKey}.${MessagesI18n.REMOVE_SUCCESS}`,
  },
} as const;
