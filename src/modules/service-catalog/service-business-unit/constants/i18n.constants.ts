import { ErrorsI18n, LabelsI18n, MessagesI18n } from '@i18n/index';

export const SubModuleKeys = {
  moduleKey: 'serviceCatalog',
  entityKey: 'serviceBusinessUnit',
  i18nKey: 'serviceCatalog.serviceBusinessUnit',
} as const;

export const I18nKeys = {
  errors: {
    notFound: `${SubModuleKeys.i18nKey}.${ErrorsI18n.NOT_FOUND}`,
    invalidData: `${SubModuleKeys.i18nKey}.${ErrorsI18n.INVALID_DATA}`,
    alreadyExists: `${SubModuleKeys.i18nKey}.${ErrorsI18n.ALREADY_EXISTS}`,
    serviceAlreadyAssociatedToUnit: `${SubModuleKeys.i18nKey}.serviceAlreadyAssociatedToUnit`,
    unitAlreadyAssociatedToService: `${SubModuleKeys.i18nKey}.unitAlreadyAssociatedToService`,
  },
  labels: {
    createSummary: `${SubModuleKeys.i18nKey}.${LabelsI18n.CREATE_SUMMARY}`,
    getUnitsSummary: `${SubModuleKeys.i18nKey}.getUnitsSummary`,
    getServicesSummary: `${SubModuleKeys.i18nKey}.getServicesSummary`,
    getByIdSummary: `${SubModuleKeys.i18nKey}.${LabelsI18n.GET_BY_ID_SUMMARY}`,
    updateSummary: `${SubModuleKeys.i18nKey}.${LabelsI18n.UPDATE_SUMMARY}`,
    associateUnitsSummary: `${SubModuleKeys.i18nKey}.associateUnitsSummary`,
    associateServicesSummary: `${SubModuleKeys.i18nKey}.associateServicesSummary`,
    removeSummary: `${SubModuleKeys.i18nKey}.${LabelsI18n.REMOVE_SUMMARY}`,
    userIdHeader: `${SubModuleKeys.i18nKey}.${LabelsI18n.USER_ID_HEADER}`,
  },
  messages: {
    createSuccess: `${SubModuleKeys.i18nKey}.${MessagesI18n.CREATE_SUCCESS}`,
    getAllSuccess: `${SubModuleKeys.i18nKey}.${MessagesI18n.GET_ALL_SUCCESS}`,
    getByIdSuccess: `${SubModuleKeys.i18nKey}.${MessagesI18n.GET_BY_ID_SUCCESS}`,
    getByCodeSuccess: `${SubModuleKeys.i18nKey}.${MessagesI18n.GET_BY_CODE_SUCCESS}`,
    updateSuccess: `${SubModuleKeys.i18nKey}.${MessagesI18n.UPDATE_SUCCESS}`,
    associateUnitsSuccess: `${SubModuleKeys.i18nKey}.associateUnitsSuccess`,
    associateServicesSuccess: `${SubModuleKeys.i18nKey}.associateServicesSuccess`,
    removeSuccess: `${SubModuleKeys.i18nKey}.${MessagesI18n.REMOVE_SUCCESS}`,
  },
} as const;

export const DtoI18nKeys = {
  cost: `${SubModuleKeys.i18nKey}.dto.cost`,
  price: `${SubModuleKeys.i18nKey}.dto.price`,
  duration: `${SubModuleKeys.i18nKey}.dto.duration`,
  extraData: `${SubModuleKeys.i18nKey}.dto.extraData`,
  isActive: `${SubModuleKeys.i18nKey}.dto.isActive`,
} as const;
