import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiHeader, ApiResponse } from '@nestjs/swagger';

export function ApiCreateBusinessUnitRoomMaterial() {
  return applyDecorators(
    ApiOperation({ summary: 'Create business unit room material' }),
    ApiHeader({
      name: 'user-id',
      description: 'ID del usuario que realiza la operación',
      required: false,
    }),
    ApiResponse({
      status: 201,
      description: 'Business unit room material creado exitosamente',
    }),
    ApiResponse({
      status: 400,
      description: 'Datos de entrada inválidos',
    }),
  );
}

export function ApiGetAllBusinessUnitRoomMaterials() {
  return applyDecorators(
    ApiOperation({ summary: 'Get all business unit room materials' }),
    ApiResponse({
      status: 200,
      description:
        'Lista de business unit room materials obtenida correctamente',
    }),
  );
}

export function ApiGetBusinessUnitRoomMaterialById() {
  return applyDecorators(
    ApiOperation({ summary: 'Get business unit room material by id' }),
    ApiResponse({
      status: 200,
      description: 'Business unit room material obtenido correctamente',
    }),
    ApiResponse({
      status: 404,
      description: 'Business unit room material no encontrado',
    }),
  );
}

export function ApiUpdateBusinessUnitRoomMaterial() {
  return applyDecorators(
    ApiOperation({ summary: 'Update business unit room material' }),
    ApiHeader({
      name: 'user-id',
      description: 'ID del usuario que realiza la operación',
      required: false,
    }),
    ApiResponse({
      status: 200,
      description: 'Business unit room material actualizado exitosamente',
    }),
    ApiResponse({
      status: 404,
      description: 'Business unit room material no encontrado',
    }),
  );
}

export function ApiRemoveBusinessUnitRoomMaterial() {
  return applyDecorators(
    ApiOperation({ summary: 'Remove business unit room material' }),
    ApiHeader({
      name: 'user-id',
      description: 'ID del usuario que realiza la operación',
      required: false,
    }),
    ApiResponse({
      status: 200,
      description: 'Business unit room material eliminado exitosamente',
    }),
    ApiResponse({
      status: 404,
      description: 'Business unit room material no encontrado',
    }),
  );
}
