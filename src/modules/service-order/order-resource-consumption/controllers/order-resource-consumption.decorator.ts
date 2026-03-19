import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function ApiCreateOrderResourceConsumption() {
  return applyDecorators(
    ApiOperation({
      summary: 'Crear un nuevo consumo de recurso',
      description:
        'Permite registrar un nuevo consumo de recurso (material) para una orden de servicio.',
    }),
    ApiResponse({
      status: 201,
      description: 'Consumo de recurso creado exitosamente',
    }),
    ApiResponse({
      status: 404,
      description: 'Orden de servicio o recurso no encontrado',
    }),
  );
}

export function ApiGetAllOrderResourceConsumptions() {
  return applyDecorators(
    ApiOperation({
      summary: 'Obtener todos los consumos de recursos de una orden',
      description:
        'Retorna un listado completo de los consumos de recursos para una orden de servicio específica.',
    }),
    ApiResponse({
      status: 200,
      description: 'Listado obtenido correctamente',
    }),
  );
}

export function ApiGetOrderResourceConsumptionById() {
  return applyDecorators(
    ApiOperation({
      summary: 'Obtener consumo de recurso por ID',
      description:
        'Busca un consumo de recurso específico utilizando su identificador único.',
    }),
    ApiResponse({
      status: 200,
      description: 'Consumo encontrado',
    }),
    ApiResponse({
      status: 404,
      description: 'Consumo no encontrado',
    }),
  );
}

export function ApiUpdateOrderResourceConsumption() {
  return applyDecorators(
    ApiOperation({
      summary: 'Actualizar consumo de recurso',
      description: 'Actualiza los datos de un consumo de recurso existente.',
    }),
    ApiResponse({
      status: 200,
      description: 'Consumo actualizado correctamente',
    }),
    ApiResponse({
      status: 404,
      description: 'Consumo no encontrado',
    }),
  );
}

export function ApiRemoveOrderResourceConsumption() {
  return applyDecorators(
    ApiOperation({
      summary: 'Eliminar consumo de recurso',
      description: 'Elimina de forma física un consumo de recurso de la orden.',
    }),
    ApiResponse({
      status: 200,
      description: 'Consumo eliminado correctamente',
    }),
    ApiResponse({
      status: 404,
      description: 'Consumo no encontrado',
    }),
  );
}
