import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiHeader, ApiResponse } from '@nestjs/swagger';

export function ApiCreateBusinessUnitRoomService() {
  return applyDecorators(
    ApiOperation({ summary: 'Create business unit room service' }),
    ApiHeader({
      name: 'user-id',
      description: 'ID del usuario que realiza la operación',
      required: false,
    }),
    ApiResponse({
      status: 201,
      description: 'Business unit room service creado exitosamente',
    }),
    ApiResponse({
      status: 400,
      description: 'Datos de entrada inválidos',
    }),
  );
}

export function ApiCreateManyBusinessUnitRoomService() {
  return applyDecorators(
    ApiOperation({ summary: 'Create many business unit room services' }),
    ApiHeader({
      name: 'user-id',
      description: 'ID del usuario que realiza la operación',
      required: false,
    }),
    ApiResponse({
      status: 201,
      description: 'Business unit room services creados exitosamente',
    }),
    ApiResponse({
      status: 400,
      description: 'Datos de entrada inválidos',
    }),
  );
}

export function ApiGetAllBusinessUnitRoomServices() {
  return applyDecorators(
    ApiOperation({ summary: 'Get all business unit room services' }),
    ApiResponse({
      status: 200,
      description:
        'Lista de business unit room services obtenida correctamente',
    }),
  );
}

export function ApiGetBusinessUnitRoomServiceById() {
  return applyDecorators(
    ApiOperation({ summary: 'Get business unit room service by id' }),
    ApiResponse({
      status: 200,
      description: 'Business unit room service obtenido correctamente',
    }),
    ApiResponse({
      status: 404,
      description: 'Business unit room service no encontrado',
    }),
  );
}

export function ApiRemoveBusinessUnitRoomService() {
  return applyDecorators(
    ApiOperation({ summary: 'Remove business unit room service' }),
    ApiHeader({
      name: 'user-id',
      description: 'ID del usuario que realiza la operación',
      required: false,
    }),
    ApiResponse({
      status: 200,
      description: 'Business unit room service eliminado exitosamente',
    }),
    ApiResponse({
      status: 404,
      description: 'Business unit room service no encontrado',
    }),
  );
}
