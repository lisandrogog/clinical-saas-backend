import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function ApiCreateMaterialResource() {
  return applyDecorators(
    ApiOperation({
      summary: 'Create a new material resource',
      description: 'Creates a new material resource with the given data',
    }),
    ApiResponse({
      status: 201,
      description: 'Material resource created successfully',
    }),
  );
}

export function ApiGetUnitsByMaterial() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get units by material',
      description: 'Gets units by material',
    }),
    ApiResponse({
      status: 200,
      description: 'Units by material retrieved successfully',
    }),
    ApiResponse({
      status: 404,
      description: 'Units by material not found',
    }),
  );
}

export function ApiGetMaterialsByUnit() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get materials by unit',
      description: 'Gets materials by unit',
    }),
    ApiResponse({
      status: 200,
      description: 'Materials by unit retrieved successfully',
    }),
    ApiResponse({
      status: 404,
      description: 'Materials by unit not found',
    }),
  );
}

export function ApiGetBusinessUnitMaterialResourceById() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get business unit material resource by id',
      description: 'Gets business unit material resource by id',
    }),
    ApiResponse({
      status: 200,
      description:
        'Business unit material resource by id retrieved successfully',
    }),
    ApiResponse({
      status: 404,
      description: 'Business unit material resource by id not found',
    }),
  );
}

export function ApiUpdateBusinessUnitMaterialResource() {
  return applyDecorators(
    ApiOperation({
      summary: 'Update a business unit material resource',
      description:
        'Updates a business unit material resource with the given data',
    }),
    ApiResponse({
      status: 200,
      description: 'Business unit material resource updated successfully',
    }),
    ApiResponse({
      status: 404,
      description: 'Business unit material resource not found',
    }),
  );
}

export function ApiDeleteBusinessUnitMaterialResource() {
  return applyDecorators(
    ApiOperation({
      summary: 'Delete a business unit material resource',
      description:
        'Deletes a business unit material resource with the given data',
    }),
    ApiResponse({
      status: 200,
      description: 'Business unit material resource deleted successfully',
    }),
    ApiResponse({
      status: 404,
      description: 'Business unit material resource not found',
    }),
  );
}
