import { applyDecorators } from '@nestjs/common';
import {
  ApiHeader,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';

export function ApiUpsertProviderSchedule() {
  return applyDecorators(
    ApiOperation({
      summary: 'Crear o actualizar horario del proveedor',
      description:
        'Define o modifica la disponibilidad horaria de un proveedor de servicios.',
    }),
    ApiHeader({
      name: 'tenant-id',
      description: 'ID del inquilino (Tenant)',
      required: true,
    }),
    ApiHeader({
      name: 'business-unit-id',
      description: 'ID de la unidad de negocio',
      required: true,
    }),
    ApiResponse({
      status: 201,
      description: 'Horario procesado y guardado exitosamente',
    }),
    ApiResponse({
      status: 400,
      description:
        'Los datos del horario son inválidos o están mal formateados',
    }),
  );
}

export function ApiGetProviderScheduleByUnit() {
  return applyDecorators(
    ApiOperation({
      summary: 'Obtener horario del proveedor por unidad',
      description:
        'Recupera la configuración de horarios para un proveedor dentro de una unidad de negocio específica.',
    }),
    ApiHeader({
      name: 'tenant-id',
      description: 'ID del inquilino (Tenant)',
      required: true,
    }),
    ApiParam({
      name: 'serviceProviderId',
      description: 'ID único del proveedor de servicios',
      required: true,
    }),
    ApiParam({
      name: 'businessUnitId',
      description: 'ID de la unidad de negocio',
      required: true,
    }),
    ApiResponse({
      status: 200,
      description: 'Horario recuperado correctamente',
    }),
    ApiResponse({
      status: 404,
      description:
        'No se encontró un horario para los parámetros proporcionados',
    }),
  );
}

export function ApiRemoveProviderSchedule() {
  return applyDecorators(
    ApiOperation({
      summary: 'Eliminar horario del proveedor',
      description:
        'Borra por completo la configuración de horarios del proveedor en la unidad especificada.',
    }),
    ApiHeader({
      name: 'tenant-id',
      description: 'ID del inquilino (Tenant)',
      required: true,
    }),
    ApiParam({
      name: 'serviceProviderId',
      description: 'ID único del proveedor de servicios',
      required: true,
    }),
    ApiParam({
      name: 'businessUnitId',
      description: 'ID de la unidad de negocio',
      required: true,
    }),
    ApiResponse({
      status: 200,
      description: 'Horario eliminado exitosamente',
    }),
    ApiResponse({
      status: 404,
      description: 'El horario que intenta eliminar no existe',
    }),
  );
}
