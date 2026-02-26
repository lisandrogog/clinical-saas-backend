import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiHeader, ApiResponse } from '@nestjs/swagger';

export function ApiCreateMaterialResource() {
  return applyDecorators(
    ApiOperation({ summary: 'Create material resource' }),
    ApiHeader({
      name: 'user-id',
      description: 'ID del usuario que realiza la operación',
      required: false,
    }),
    ApiResponse({
      status: 201,
      description: 'Material resource creado exitosamente',
    }),
    ApiResponse({
      status: 400,
      description: 'Datos de entrada inválidos',
    }),
  );
}

export function ApiGetAllMaterialResources() {
  return applyDecorators(
    ApiOperation({ summary: 'Get all material resources' }),
    ApiResponse({
      status: 200,
      description: 'Lista de material resources obtenida correctamente',
    }),
  );
}

export function ApiGetMaterialResourceById() {
  return applyDecorators(
    ApiOperation({ summary: 'Get material resource by id' }),
    ApiResponse({
      status: 200,
      description: 'Material resource obtenido correctamente',
    }),
    ApiResponse({
      status: 404,
      description: 'Material resource no encontrado',
    }),
  );
}
export function ApiGetMaterialResourceByCode() {
  return applyDecorators(
    ApiOperation({ summary: 'Get material resource by code' }),
    ApiResponse({
      status: 200,
      description: 'Material resource obtenido correctamente',
    }),
    ApiResponse({
      status: 404,
      description: 'Material resource no encontrado',
    }),
  );
}

export function ApiUpdateMaterialResource() {
  return applyDecorators(
    ApiOperation({ summary: 'Update material resource' }),
    ApiHeader({
      name: 'user-id',
      description: 'ID del usuario que realiza la operación',
      required: false,
    }),
    ApiResponse({
      status: 200,
      description: 'Material resource actualizado exitosamente',
    }),
    ApiResponse({
      status: 404,
      description: 'Material resource no encontrado',
    }),
  );
}

export function ApiDisableMaterialResource() {
  return applyDecorators(
    ApiOperation({ summary: 'Disable material resource' }),
    ApiHeader({
      name: 'user-id',
      description: 'ID del usuario que realiza la operación',
      required: false,
    }),
    ApiResponse({
      status: 200,
      description: 'Material resource deshabilitado exitosamente',
    }),
    ApiResponse({
      status: 404,
      description: 'Material resource no encontrado',
    }),
  );
}

export function ApiEnableMaterialResource() {
  return applyDecorators(
    ApiOperation({ summary: 'Enable material resource' }),
    ApiHeader({
      name: 'user-id',
      description: 'ID del usuario que realiza la operación',
      required: false,
    }),
    ApiResponse({
      status: 200,
      description: 'Material resource habilitado exitosamente',
    }),
    ApiResponse({
      status: 404,
      description: 'Material resource no encontrado',
    }),
  );
}

export function ApiRemoveMaterialResource() {
  return applyDecorators(
    ApiOperation({ summary: 'Remove material resource' }),
    ApiHeader({
      name: 'user-id',
      description: 'ID del usuario que realiza la operación',
      required: false,
    }),
    ApiResponse({
      status: 200,
      description: 'Material resource eliminado exitosamente',
    }),
    ApiResponse({
      status: 404,
      description: 'Material resource no encontrado',
    }),
  );
}
