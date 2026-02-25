import { applyDecorators } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { I18nKeys } from '../constants/i18n.constants';

export function ApiCreateServiceCategory() {
  return applyDecorators(
    ApiOperation({
      summary: I18nKeys.labels.createSummary,
      description: I18nKeys.labels.createSummary,
    }),
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
      status: 404,
      description: I18nKeys.errors.notFound,
    }),
  );
}

export function ApiGetAllServiceCategories() {
  return applyDecorators(
    ApiOperation({
      summary: I18nKeys.labels.getAllSummary,
      description: I18nKeys.labels.getAllSummary,
    }),
    ApiResponse({
      status: 200,
      description: I18nKeys.messages.getAllSuccess,
    }),
    ApiResponse({
      status: 404,
      description: I18nKeys.errors.notFound,
    }),
  );
}

export function ApiGetServiceCategoryById() {
  return applyDecorators(
    ApiOperation({
      summary: I18nKeys.labels.getByIdSummary,
      description: I18nKeys.labels.getByIdSummary,
    }),
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

export function ApiGetServiceCategoryByCode() {
  return applyDecorators(
    ApiOperation({
      summary: I18nKeys.labels.getByCodeSummary,
      description: I18nKeys.labels.getByCodeSummary,
    }),
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

export function ApiUpdateServiceCategory() {
  return applyDecorators(
    ApiOperation({
      summary: I18nKeys.labels.updateSummary,
      description: I18nKeys.labels.updateSummary,
    }),
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

export function ApiRemoveServiceCategory() {
  return applyDecorators(
    ApiOperation({
      summary: I18nKeys.labels.removeSummary,
      description: I18nKeys.labels.removeSummary,
    }),
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
