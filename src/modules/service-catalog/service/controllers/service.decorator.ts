import { applyDecorators } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiResponse } from '@nestjs/swagger';

export function ApiCreateService() {
  return applyDecorators(
    ApiOperation({ summary: 'Crear un nuevo servicio' }),
    ApiHeader({
      name: 'user-id',
      description: 'ID del usuario que realiza la operación',
      required: false,
    }),
    ApiResponse({
      status: 201,
      description: 'Servicio creado exitosamente',
    }),
    ApiResponse({
      status: 400,
      description: 'Datos de entrada inválidos',
    }),
  );
}

export function ApiGetServices() {
  return applyDecorators(
    ApiOperation({ summary: 'Obtener catálogo de servicios' }),
    ApiResponse({
      status: 200,
      description: 'Lista de servicios obtenida correctamente',
    }),
  );
}

export function ApiGetOneServiceById() {
  return applyDecorators(
    ApiOperation({ summary: 'Obtener un servicio por su ID' }),
    ApiResponse({
      status: 200,
      description: 'Servicio encontrado',
    }),
    ApiResponse({
      status: 404,
      description: 'Servicio no encontrado',
    }),
  );
}

export function ApiGetOneServiceByCode() {
  return applyDecorators(
    ApiOperation({ summary: 'Obtener un servicio por su código único' }),
    ApiResponse({
      status: 200,
      description: 'Servicio encontrado',
    }),
    ApiResponse({
      status: 404,
      description: 'Servicio no encontrado',
    }),
  );
}

export function ApiUpdateService() {
  return applyDecorators(
    ApiOperation({ summary: 'Actualizar los datos de un servicio' }),
    ApiHeader({
      name: 'user-id',
      description: 'ID del usuario que realiza la operación',
      required: false,
    }),
    ApiResponse({
      status: 200,
      description: 'Servicio actualizado correctamente',
    }),
    ApiResponse({
      status: 404,
      description: 'Servicio no encontrado',
    }),
  );
}

export function ApiDisableService() {
  return applyDecorators(
    ApiOperation({ summary: 'Deshabilitar un servicio' }),
    ApiHeader({
      name: 'user-id',
      description: 'ID del usuario que realiza la operación',
      required: false,
    }),
    ApiResponse({
      status: 200,
      description: 'Servicio deshabilitado correctamente',
    }),
    ApiResponse({
      status: 404,
      description: 'Servicio no encontrado',
    }),
  );
}

export function ApiEnableService() {
  return applyDecorators(
    ApiOperation({ summary: 'Habilitar un servicio' }),
    ApiHeader({
      name: 'user-id',
      description: 'ID del usuario que realiza la operación',
      required: false,
    }),
    ApiResponse({
      status: 200,
      description: 'Servicio habilitado correctamente',
    }),
    ApiResponse({
      status: 404,
      description: 'Servicio no encontrado',
    }),
  );
}

export function ApiDeleteService() {
  return applyDecorators(
    ApiOperation({ summary: 'Eliminar un servicio del sistema' }),
    ApiHeader({
      name: 'user-id',
      description: 'ID del usuario que realiza la operación',
      required: false,
    }),
    ApiResponse({
      status: 200,
      description: 'Servicio eliminado correctamente',
    }),
    ApiResponse({
      status: 404,
      description: 'Servicio no encontrado',
    }),
  );
}
