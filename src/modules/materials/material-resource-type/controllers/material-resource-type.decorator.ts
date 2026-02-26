import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function ApiCreateMaterialResourceType() {
  return applyDecorators(
    ApiOperation({
      summary: 'Create material resource type',
      description: 'Create material resource type',
    }),
    ApiResponse({
      status: 201,
      description: 'Material resource type created successfully',
    }),
  );
}

export function ApiGetAllMaterialResourceTypes() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get all material resource types',
      description: 'Get all material resource types',
    }),
    ApiResponse({
      status: 200,
      description: 'Material resource types retrieved successfully',
    }),
  );
}

export function ApiGetMaterialResourceTypeById() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get material resource type by id',
      description: 'Get material resource type by id',
    }),
    ApiResponse({
      status: 200,
      description: 'Material resource type retrieved successfully',
    }),
    ApiResponse({
      status: 404,
      description: 'Material resource type not found',
    }),
  );
}

export function ApiGetMaterialResourceTypeByCode() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get material resource type by code',
      description: 'Get material resource type by code',
    }),
    ApiResponse({
      status: 200,
      description: 'Material resource type retrieved successfully',
    }),
    ApiResponse({
      status: 404,
      description: 'Material resource type not found',
    }),
  );
}

export function ApiUpdateMaterialResourceType() {
  return applyDecorators(
    ApiOperation({
      summary: 'Update material resource type',
      description: 'Update material resource type',
    }),
    ApiResponse({
      status: 200,
      description: 'Material resource type updated successfully',
    }),
    ApiResponse({
      status: 404,
      description: 'Material resource type not found',
    }),
  );
}

export function ApiRemoveMaterialResourceType() {
  return applyDecorators(
    ApiOperation({
      summary: 'Remove material resource type',
      description: 'Remove material resource type',
    }),
    ApiResponse({
      status: 200,
      description: 'Material resource type removed successfully',
    }),
    ApiResponse({
      status: 404,
      description: 'Material resource type not found',
    }),
  );
}
