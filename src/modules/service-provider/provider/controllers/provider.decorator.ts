import { applyDecorators } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiResponse } from '@nestjs/swagger';

export function ApiCreateProvider() {
  return applyDecorators(
    ApiOperation({ summary: 'Registrar un nuevo proveedor' }),
    ApiHeader({
      name: 'user-id',
      description: 'ID del usuario que realiza la operación',
      required: false,
    }),
    ApiResponse({
      status: 201,
      description: 'Proveedor registrado exitosamente',
    }),
    ApiResponse({
      status: 400,
      description: 'Los datos proporcionados son inválidos',
    }),
  );
}

export function ApiGetAllProviders() {
  return applyDecorators(
    ApiOperation({ summary: 'Listar todos los proveedores' }),
    ApiResponse({
      status: 200,
      description: 'Lista de proveedores obtenida correctamente',
    }),
  );
}

export function ApiGetProviderById() {
  return applyDecorators(
    ApiOperation({ summary: 'Obtener proveedor por ID' }),
    ApiResponse({
      status: 200,
      description: 'Proveedor encontrado',
    }),
    ApiResponse({
      status: 404,
      description: 'El proveedor no existe en el sistema',
    }),
  );
}

export function ApiUpdateProvider() {
  return applyDecorators(
    ApiOperation({ summary: 'Actualizar información del proveedor' }),
    ApiHeader({
      name: 'user-id',
      description: 'ID del usuario que realiza la operación',
      required: false,
    }),
    ApiResponse({
      status: 200,
      description: 'Información actualizada correctamente',
    }),
    ApiResponse({
      status: 404,
      description: 'Proveedor no encontrado',
    }),
  );
}

export function ApiDisableProvider() {
  return applyDecorators(
    ApiOperation({ summary: 'Deshabilitar un proveedor' }),
    ApiHeader({
      name: 'user-id',
      description: 'ID del usuario que realiza la operación',
      required: false,
    }),
    ApiResponse({
      status: 200,
      description: 'Proveedor deshabilitado (inactivo) correctamente',
    }),
    ApiResponse({
      status: 404,
      description: 'Proveedor no encontrado',
    }),
  );
}

export function ApiEnableProvider() {
  return applyDecorators(
    ApiOperation({ summary: 'Habilitar un proveedor' }),
    ApiHeader({
      name: 'user-id',
      description: 'ID del usuario que realiza la operación',
      required: false,
    }),
    ApiResponse({
      status: 200,
      description: 'Proveedor habilitado (activo) correctamente',
    }),
    ApiResponse({
      status: 404,
      description: 'Proveedor no encontrado',
    }),
  );
}

export function ApiRemoveProvider() {
  return applyDecorators(
    ApiOperation({ summary: 'Eliminar un proveedor' }),
    ApiHeader({
      name: 'user-id',
      description: 'ID del usuario que realiza la operación',
      required: false,
    }),
    ApiResponse({
      status: 200,
      description: 'Proveedor eliminado del sistema correctamente',
    }),
    ApiResponse({
      status: 404,
      description: 'Proveedor no encontrado',
    }),
  );
}
