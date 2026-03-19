import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function ApiCreateOrderDetail() {
  return applyDecorators(
    ApiOperation({
      summary: 'Crear detalle de orden',
      description: 'Crea un nuevo detalle clínico de una orden de servicio',
    }),
    ApiResponse({ status: 201, description: 'Detalle creado exitosamente' }),
  );
}

export function ApiGetAllOrderDetails() {
  return applyDecorators(
    ApiOperation({
      summary: 'Listar detalles de una orden',
      description: 'Obtiene todos los detalles de órdenes de servicio',
    }),
    ApiResponse({ status: 200, description: 'Listado obtenido correctamente' }),
  );
}

export function ApiGetOrderDetailById() {
  return applyDecorators(
    ApiOperation({
      summary: 'Obtener detalle por ID',
      description: 'Busca un detalle de orden utilizando su identificador',
    }),
    ApiResponse({ status: 200, description: 'Detalle encontrado' }),
    ApiResponse({ status: 404, description: 'Detalle no encontrado' }),
  );
}

export function ApiUpdateOrderDetail() {
  return applyDecorators(
    ApiOperation({
      summary: 'Actualizar detalle',
      description: 'Actualiza un detalle de orden existente',
    }),
    ApiResponse({ status: 200, description: 'Detalle actualizado' }),
    ApiResponse({ status: 404, description: 'Detalle no encontrado' }),
  );
}

export function ApiRemoveOrderDetail() {
  return applyDecorators(
    ApiOperation({
      summary: 'Eliminar detalle',
      description: 'Elimina lógicamente un detalle de orden',
    }),
    ApiResponse({ status: 200, description: 'Detalle eliminado' }),
    ApiResponse({ status: 404, description: 'Detalle no encontrado' }),
  );
}
