import { ErrorsI18n, MessagesI18n } from '@i18n/index';

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
