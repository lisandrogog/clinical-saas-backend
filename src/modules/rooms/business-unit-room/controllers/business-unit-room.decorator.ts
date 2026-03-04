import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiHeader, ApiResponse } from '@nestjs/swagger';

export function ApiCreateBusinessUnitRoom() {
  return applyDecorators(
    ApiOperation({ summary: 'Create business unit room' }),
    ApiHeader({
      name: 'user-id',
      description: 'ID del usuario que realiza la operación',
      required: false,
    }),
    ApiResponse({
      status: 201,
      description: 'Business unit room creado exitosamente',
    }),
    ApiResponse({
      status: 400,
      description: 'Datos de entrada inválidos',
    }),
  );
}

export function ApiGetAllBusinessUnitRooms() {
  return applyDecorators(
    ApiOperation({ summary: 'Get all business unit rooms' }),
    ApiResponse({
      status: 200,
      description: 'Lista de business unit rooms obtenida correctamente',
    }),
  );
}

export function ApiGetBusinessUnitRoomById() {
  return applyDecorators(
    ApiOperation({ summary: 'Get business unit room by id' }),
    ApiResponse({
      status: 200,
      description: 'Business unit room obtenido correctamente',
    }),
    ApiResponse({
      status: 404,
      description: 'Business unit room no encontrado',
    }),
  );
}
export function ApiGetBusinessUnitRoomByCode() {
  return applyDecorators(
    ApiOperation({ summary: 'Get business unit room by code' }),
    ApiResponse({
      status: 200,
      description: 'Business unit room obtenido correctamente',
    }),
    ApiResponse({
      status: 404,
      description: 'Business unit room no encontrado',
    }),
  );
}

export function ApiUpdateBusinessUnitRoom() {
  return applyDecorators(
    ApiOperation({ summary: 'Update business unit room' }),
    ApiHeader({
      name: 'user-id',
      description: 'ID del usuario que realiza la operación',
      required: false,
    }),
    ApiResponse({
      status: 200,
      description: 'Business unit room actualizado exitosamente',
    }),
    ApiResponse({
      status: 404,
      description: 'Business unit room no encontrado',
    }),
  );
}

export function ApiDisableBusinessUnitRoom() {
  return applyDecorators(
    ApiOperation({ summary: 'Disable business unit room' }),
    ApiHeader({
      name: 'user-id',
      description: 'ID del usuario que realiza la operación',
      required: false,
    }),
    ApiResponse({
      status: 200,
      description: 'Business unit room deshabilitado exitosamente',
    }),
    ApiResponse({
      status: 404,
      description: 'Business unit room no encontrado',
    }),
  );
}

export function ApiEnableBusinessUnitRoom() {
  return applyDecorators(
    ApiOperation({ summary: 'Enable business unit room' }),
    ApiHeader({
      name: 'user-id',
      description: 'ID del usuario que realiza la operación',
      required: false,
    }),
    ApiResponse({
      status: 200,
      description: 'Business unit room habilitado exitosamente',
    }),
    ApiResponse({
      status: 404,
      description: 'Business unit room no encontrado',
    }),
  );
}

export function ApiRemoveBusinessUnitRoom() {
  return applyDecorators(
    ApiOperation({ summary: 'Remove business unit room' }),
    ApiHeader({
      name: 'user-id',
      description: 'ID del usuario que realiza la operación',
      required: false,
    }),
    ApiResponse({
      status: 200,
      description: 'Business unit room eliminado exitosamente',
    }),
    ApiResponse({
      status: 404,
      description: 'Business unit room no encontrado',
    }),
  );
}
