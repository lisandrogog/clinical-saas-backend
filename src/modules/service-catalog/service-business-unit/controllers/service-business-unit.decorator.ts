import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiHeader, ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
  AssociateServicesDto,
  AssociateUnitsDto,
  CreateServiceBusinessUnitDto,
  UpdateServiceBusinessUnitDto,
} from '../dto';
import { I18nKeys } from '../constants/i18n.constants';

export function ApiCreateServiceBusinessUnit() {
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
    ApiBody({
      type: CreateServiceBusinessUnitDto,
    }),
    ApiResponse({
      status: 201,
      description: I18nKeys.messages.createSuccess,
    }),
  );
}

export function ApiGetUnitsByService() {
  return applyDecorators(
    ApiOperation({
      summary: I18nKeys.labels.getUnitsSummary,
      description: I18nKeys.labels.getUnitsSummary,
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

export function ApiGetServicesByUnit() {
  return applyDecorators(
    ApiOperation({
      summary: I18nKeys.labels.getServicesSummary,
      description: I18nKeys.labels.getServicesSummary,
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

export function ApiGetOneServiceBusinessUnitById() {
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

export function ApiUpdateServiceBusinessUnit() {
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
    ApiBody({
      type: UpdateServiceBusinessUnitDto,
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

export function ApiAssociateServices() {
  return applyDecorators(
    ApiOperation({
      summary: I18nKeys.labels.associateServicesSummary,
      description: I18nKeys.labels.associateServicesSummary,
    }),
    ApiHeader({
      name: 'user-id',
      description: I18nKeys.labels.userIdHeader,
      required: false,
    }),
    ApiBody({
      type: AssociateServicesDto,
    }),
    ApiResponse({
      status: 200,
      description: I18nKeys.messages.associateServicesSuccess,
    }),
    ApiResponse({
      status: 404,
      description: I18nKeys.errors.notFound,
    }),
  );
}

export function ApiAssociateUnits() {
  return applyDecorators(
    ApiOperation({
      summary: I18nKeys.labels.associateUnitsSummary,
      description: I18nKeys.labels.associateUnitsSummary,
    }),
    ApiHeader({
      name: 'user-id',
      description: I18nKeys.labels.userIdHeader,
      required: false,
    }),
    ApiBody({
      type: AssociateUnitsDto,
    }),
    ApiResponse({
      status: 200,
      description: I18nKeys.messages.associateUnitsSuccess,
    }),
    ApiResponse({
      status: 404,
      description: I18nKeys.errors.notFound,
    }),
  );
}

export function ApiDeleteServiceBusinessUnit() {
  return applyDecorators(
    ApiOperation({
      summary: I18nKeys.labels.removeSummary,
      description: I18nKeys.labels.removeSummary,
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
