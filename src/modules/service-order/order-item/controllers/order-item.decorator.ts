import { applyDecorators } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiResponse } from '@nestjs/swagger';

export function ApiCreateOrderItem() {
  return applyDecorators(
    ApiOperation({
      summary: 'Crear un nuevo ítem de orden de servicio',
      description:
        'Permite registrar un nuevo ítem para una orden de servicio.',
    }),
    ApiHeader({
      name: 'tenant-id',
      description: 'ID del tenant',
      required: true,
    }),
    ApiHeader({
      name: 'business-unit-id',
      description: 'ID de la unidad de negocio',
      required: true,
    }),
    ApiResponse({
      status: 201,
      description: 'Ítem de orden creado exitosamente',
    }),
    ApiResponse({
      status: 404,
      description: 'Orden de servicio no encontrada',
    }),
  );
}

export function ApiGetAllOrderItems() {
  return applyDecorators(
    ApiOperation({
      summary: 'Obtener todos los ítems de una orden',
      description:
        'Retorna un listado completo de los ítems para una orden de servicio específica.',
    }),
    ApiHeader({
      name: 'tenant-id',
      description: 'ID del tenant',
      required: true,
    }),
    ApiHeader({
      name: 'business-unit-id',
      description: 'ID de la unidad de negocio',
      required: true,
    }),
    ApiResponse({
      status: 200,
      description: 'Listado obtenido correctamente',
    }),
    ApiResponse({
      status: 404,
      description: 'No se encontraron ítems',
    }),
  );
}

export function ApiGetOrderItemById() {
  return applyDecorators(
    ApiOperation({
      summary: 'Obtener ítem de orden por ID',
      description:
        'Busca un ítem de orden específico utilizando su identificador único.',
    }),
    ApiHeader({
      name: 'tenant-id',
      description: 'ID del tenant',
      required: true,
    }),
    ApiHeader({
      name: 'business-unit-id',
      description: 'ID de la unidad de negocio',
      required: true,
    }),
    ApiResponse({
      status: 200,
      description: 'Ítem encontrado',
    }),
    ApiResponse({
      status: 404,
      description: 'Ítem no encontrado',
    }),
  );
}

export function ApiUpdateOrderItem() {
  return applyDecorators(
    ApiOperation({
      summary: 'Actualizar ítem de orden',
      description: 'Actualiza los datos de un ítem de orden existente.',
    }),
    ApiHeader({
      name: 'tenant-id',
      description: 'ID del tenant',
      required: true,
    }),
    ApiHeader({
      name: 'business-unit-id',
      description: 'ID de la unidad de negocio',
      required: true,
    }),
    ApiResponse({
      status: 200,
      description: 'Ítem actualizado correctamente',
    }),
    ApiResponse({
      status: 404,
      description: 'Ítem no encontrado',
    }),
  );
}

export function ApiRemoveOrderItem() {
  return applyDecorators(
    ApiOperation({
      summary: 'Eliminar ítem de orden',
      description: 'Elimina de forma lógica o física un ítem de orden.',
    }),
    ApiHeader({
      name: 'tenant-id',
      description: 'ID del tenant',
      required: true,
    }),
    ApiHeader({
      name: 'business-unit-id',
      description: 'ID de la unidad de negocio',
      required: true,
    }),
    ApiResponse({
      status: 200,
      description: 'Ítem eliminado correctamente',
    }),
    ApiResponse({
      status: 404,
      description: 'Ítem no encontrado',
    }),
  );
}

export function ApiCreateManyOrderItems() {
  return applyDecorators(
    ApiOperation({
      summary: 'Crear múltiples ítems de orden',
      description:
        'Permite registrar múltiples ítems para una orden de servicio simultáneamente.',
    }),
    ApiHeader({
      name: 'tenant-id',
      description: 'ID del tenant',
      required: true,
    }),
    ApiHeader({
      name: 'business-unit-id',
      description: 'ID de la unidad de negocio',
      required: true,
    }),
    ApiResponse({
      status: 201,
      description: 'Ítems creados exitosamente',
    }),
    ApiResponse({
      status: 404,
      description: 'Orden de servicio no encontrada',
    }),
  );
}

export function ApiRemoveAllOrderItems() {
  return applyDecorators(
    ApiOperation({
      summary: 'Eliminar todos los ítems de una orden',
      description:
        'Elimina de forma lógica o física todos los ítems asociados a una orden de servicio.',
    }),
    ApiHeader({
      name: 'tenant-id',
      description: 'ID del tenant',
      required: true,
    }),
    ApiHeader({
      name: 'business-unit-id',
      description: 'ID de la unidad de negocio',
      required: true,
    }),
    ApiResponse({
      status: 200,
      description: 'Ítems eliminados correctamente',
    }),
    ApiResponse({
      status: 404,
      description: 'Orden de servicio no encontrada',
    }),
  );
}
