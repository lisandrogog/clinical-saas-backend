import { ErrorsI18n, LabelsI18n, MessagesI18n } from '@i18n/index';

export const SubModuleKeys = {
  moduleKey: 'organization',
  entityKey: 'tenant',
  i18nKey: 'organization.tenant',
} as const;

export const I18nKeys = {
  errors: {
    notFound: `${SubModuleKeys.i18nKey}.${ErrorsI18n.NOT_FOUND}`,
    invalidData: `${SubModuleKeys.i18nKey}.${ErrorsI18n.INVALID_DATA}`,
    unauthorized: `${SubModuleKeys.i18nKey}.${ErrorsI18n.UNAUTHORIZED}`,
    forbidden: `${SubModuleKeys.i18nKey}.${ErrorsI18n.FORBIDDEN}`,
    internalServerError: `${SubModuleKeys.i18nKey}.${ErrorsI18n.INTERNAL_SERVER_ERROR}`,
    alreadyExists: `${SubModuleKeys.i18nKey}.${ErrorsI18n.ALREADY_EXISTS}`,
  },
  labels: {
    createSummary: `${SubModuleKeys.i18nKey}.${LabelsI18n.CREATE_SUMMARY}`,
    getByIdSummary: `${SubModuleKeys.i18nKey}.${LabelsI18n.GET_BY_ID_SUMMARY}`,
    getByCodeSummary: `${SubModuleKeys.i18nKey}.${LabelsI18n.GET_BY_CODE_SUMMARY}`,
    getAllSummary: `${SubModuleKeys.i18nKey}.${LabelsI18n.GET_ALL_SUMMARY}`,
    updateSummary: `${SubModuleKeys.i18nKey}.${LabelsI18n.UPDATE_SUMMARY}`,
    removeSummary: `${SubModuleKeys.i18nKey}.${LabelsI18n.REMOVE_SUMMARY}`,
    userIdHeader: `${SubModuleKeys.i18nKey}.${LabelsI18n.USER_ID_HEADER}`,
  },
  messages: {
    createSuccess: `${SubModuleKeys.i18nKey}.${MessagesI18n.CREATE_SUCCESS}`,
    getAllSuccess: `${SubModuleKeys.i18nKey}.${MessagesI18n.GET_ALL_SUCCESS}`,
    getByIdSuccess: `${SubModuleKeys.i18nKey}.${MessagesI18n.GET_BY_ID_SUCCESS}`,
    getByCodeSuccess: `${SubModuleKeys.i18nKey}.${MessagesI18n.GET_BY_CODE_SUCCESS}`,
    updateSuccess: `${SubModuleKeys.i18nKey}.${MessagesI18n.UPDATE_SUCCESS}`,
    removeSuccess: `${SubModuleKeys.i18nKey}.${MessagesI18n.REMOVE_SUCCESS}`,
  },
} as const;

export const DtoI18nKeys = {
  tenantId: `${SubModuleKeys.i18nKey}.dto.tenantId`,
  tenantIds: `${SubModuleKeys.i18nKey}.dto.tenantIds`,
} as const;
