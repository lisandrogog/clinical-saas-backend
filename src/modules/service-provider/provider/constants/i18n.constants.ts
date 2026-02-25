import { ErrorsI18n, LabelsI18n, MessagesI18n } from '@i18n/index';

export const SubModuleKeys = {
  moduleKey: 'serviceProvider',
  entityKey: 'provider',
  i18nKey: 'serviceProvider.provider',
} as const;

export const I18nKeys = {
  errors: {
    notFound: `${SubModuleKeys.i18nKey}.${ErrorsI18n.NOT_FOUND}`,
    invalidData: `${SubModuleKeys.i18nKey}.${ErrorsI18n.INVALID_DATA}`,
    alreadyExists: `${SubModuleKeys.i18nKey}.${ErrorsI18n.ALREADY_EXISTS}`,
  },
  labels: {
    createSummary: `${SubModuleKeys.i18nKey}.${LabelsI18n.CREATE_SUMMARY}`,
    getAllSummary: `${SubModuleKeys.i18nKey}.${LabelsI18n.GET_ALL_SUMMARY}`,
    getByIdSummary: `${SubModuleKeys.i18nKey}.${LabelsI18n.GET_BY_ID_SUMMARY}`,
    updateSummary: `${SubModuleKeys.i18nKey}.${LabelsI18n.UPDATE_SUMMARY}`,
    disableSummary: `${SubModuleKeys.i18nKey}.${LabelsI18n.DISABLE_SUMMARY}`,
    enableSummary: `${SubModuleKeys.i18nKey}.${LabelsI18n.ENABLE_SUMMARY}`,
    removeSummary: `${SubModuleKeys.i18nKey}.${LabelsI18n.REMOVE_SUMMARY}`,
    userIdHeader: `${SubModuleKeys.i18nKey}.${LabelsI18n.USER_ID_HEADER}`,
  },
  messages: {
    createSuccess: `${SubModuleKeys.i18nKey}.${MessagesI18n.CREATE_SUCCESS}`,
    getAllSuccess: `${SubModuleKeys.i18nKey}.${MessagesI18n.GET_ALL_SUCCESS}`,
    getByIdSuccess: `${SubModuleKeys.i18nKey}.${MessagesI18n.GET_BY_ID_SUCCESS}`,
    updateSuccess: `${SubModuleKeys.i18nKey}.${MessagesI18n.UPDATE_SUCCESS}`,
    disableSuccess: `${SubModuleKeys.i18nKey}.${MessagesI18n.DISABLE_SUCCESS}`,
    enableSuccess: `${SubModuleKeys.i18nKey}.${MessagesI18n.ENABLE_SUCCESS}`,
    removeSuccess: `${SubModuleKeys.i18nKey}.${MessagesI18n.REMOVE_SUCCESS}`,
  },
} as const;

export const DtoI18nKeys = {
  isActive: `${SubModuleKeys.i18nKey}.dto.isActive`,
} as const;
