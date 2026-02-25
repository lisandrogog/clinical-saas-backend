import { applyDecorators } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { I18nKeys } from '../constants/i18n.constants';

export function ApiCreateService() {
  return applyDecorators(
    ApiOperation({ summary: I18nKeys.labels.createSummary }),
    ApiHeader({
      name: 'user-id',
      description: I18nKeys.labels.userIdHeader,
      required: false,
    }),
    ApiResponse({
      status: 201,
      description: I18nKeys.messages.createSuccess,
    }),
    ApiResponse({
      status: 400,
      description: I18nKeys.errors.invalidData,
    }),
  );
}

export function ApiGetServices() {
  return applyDecorators(
    ApiOperation({ summary: I18nKeys.labels.getAllSummary }),
    ApiResponse({
      status: 200,
      description: I18nKeys.messages.getAllSuccess,
    }),
  );
}

export function ApiGetOneServiceById() {
  return applyDecorators(
    ApiOperation({ summary: I18nKeys.labels.getByIdSummary }),
    ApiResponse({
      status: 200,
      description: I18nKeys.messages.getByIdSuccess,
    }),
    ApiResponse({
      status: 404,
      description: I18nKeys.errors.notFound,
    }),
  );
}

export function ApiGetOneServiceByCode() {
  return applyDecorators(
    ApiOperation({ summary: I18nKeys.labels.getByCodeSummary }),
    ApiResponse({
      status: 200,
      description: I18nKeys.messages.getByCodeSuccess,
    }),
    ApiResponse({
      status: 404,
      description: I18nKeys.errors.notFound,
    }),
  );
}

export function ApiUpdateService() {
  return applyDecorators(
    ApiOperation({ summary: I18nKeys.labels.updateSummary }),
    ApiHeader({
      name: 'user-id',
      description: I18nKeys.labels.userIdHeader,
      required: false,
    }),
    ApiResponse({
      status: 200,
      description: I18nKeys.messages.updateSuccess,
    }),
    ApiResponse({
      status: 404,
      description: I18nKeys.errors.notFound,
    }),
  );
}

export function ApiDisableService() {
  return applyDecorators(
    ApiOperation({ summary: I18nKeys.labels.disableSummary }),
    ApiHeader({
      name: 'user-id',
      description: I18nKeys.labels.userIdHeader,
      required: false,
    }),
    ApiResponse({
      status: 200,
      description: I18nKeys.messages.disableSuccess,
    }),
    ApiResponse({
      status: 404,
      description: I18nKeys.errors.notFound,
    }),
  );
}

export function ApiEnableService() {
  return applyDecorators(
    ApiOperation({ summary: I18nKeys.labels.enableSummary }),
    ApiHeader({
      name: 'user-id',
      description: I18nKeys.labels.userIdHeader,
      required: false,
    }),
    ApiResponse({
      status: 200,
      description: I18nKeys.messages.enableSuccess,
    }),
    ApiResponse({
      status: 404,
      description: I18nKeys.errors.notFound,
    }),
  );
}

export function ApiDeleteService() {
  return applyDecorators(
    ApiOperation({ summary: I18nKeys.labels.removeSummary }),
    ApiHeader({
      name: 'user-id',
      description: I18nKeys.labels.userIdHeader,
      required: false,
    }),
    ApiResponse({
      status: 200,
      description: I18nKeys.messages.removeSuccess,
    }),
    ApiResponse({
      status: 404,
      description: I18nKeys.errors.notFound,
    }),
  );
}
