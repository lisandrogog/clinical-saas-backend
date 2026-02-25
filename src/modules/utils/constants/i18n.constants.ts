import { ErrorsI18n, LabelsI18n, MessagesI18n } from '@i18n/index';

export const SubModuleKeys = {
  moduleKey: 'commons',
  entityKey: 'utils',
  i18nKey: 'commons.utils',
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
  identificationNumber: `${SubModuleKeys.i18nKey}.identificationNumber`,
  identificationTypeId: `${SubModuleKeys.i18nKey}.identificationTypeId`,
  firstName: `${SubModuleKeys.i18nKey}.firstName`,
  lastName: `${SubModuleKeys.i18nKey}.lastName`,
  email: `${SubModuleKeys.i18nKey}.email`,
  phone: `${SubModuleKeys.i18nKey}.phone`,
  birthDate: `${SubModuleKeys.i18nKey}.birthDate`,
  shortAddress: `${SubModuleKeys.i18nKey}.shortAddress`,
  address: `${SubModuleKeys.i18nKey}.address`,
  extraData: `${SubModuleKeys.i18nKey}.extraData`,
  active: `${SubModuleKeys.i18nKey}.active`,
  code: `${SubModuleKeys.i18nKey}.code`,
  name: `${SubModuleKeys.i18nKey}.name`,
  description: `${SubModuleKeys.i18nKey}.description`,
  itemOrder: `${SubModuleKeys.i18nKey}.itemOrder`,
  search: `${SubModuleKeys.i18nKey}.search`,
  page: `${SubModuleKeys.i18nKey}.page`,
  limit: `${SubModuleKeys.i18nKey}.limit`,
} as const;
