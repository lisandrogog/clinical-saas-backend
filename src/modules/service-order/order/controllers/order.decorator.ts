import { applyDecorators } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiResponse } from '@nestjs/swagger';

export function ApiCreateOrder() {
  return applyDecorators(
    ApiOperation({ summary: 'Create order' }),
    ApiHeader({
      name: 'user-id',
      description: 'ID del usuario que realiza la operación',
      required: false,
    }),
    ApiResponse({
      status: 201,
      description: 'Order creada exitosamente',
    }),
    ApiResponse({
      status: 400,
      description: 'Datos de entrada inválidos',
    }),
  );
}

export function ApiGetAllOrders() {
  return applyDecorators(
    ApiOperation({ summary: 'Get all orders' }),
    ApiResponse({
      status: 200,
      description: 'Lista de orders obtenida correctamente',
    }),
  );
}

export function ApiGetOrderById() {
  return applyDecorators(
    ApiOperation({ summary: 'Get order by id' }),
    ApiResponse({
      status: 200,
      description: 'Order obtenida correctamente',
    }),
    ApiResponse({
      status: 404,
      description: 'Order no encontrada',
    }),
  );
}

export function ApiUpdateOrder() {
  return applyDecorators(
    ApiOperation({ summary: 'Update order' }),
    ApiHeader({
      name: 'user-id',
      description: 'ID del usuario que realiza la operación',
      required: false,
    }),
    ApiResponse({
      status: 200,
      description: 'Order actualizada exitosamente',
    }),
    ApiResponse({
      status: 400,
      description: 'Datos de entrada inválidos',
    }),
    ApiResponse({
      status: 404,
      description: 'Order no encontrada',
    }),
  );
}

export function ApiDeleteOrder() {
  return applyDecorators(
    ApiOperation({ summary: 'Delete order' }),
    ApiHeader({
      name: 'user-id',
      description: 'ID del usuario que realiza la operación',
      required: false,
    }),
    ApiResponse({
      status: 200,
      description: 'Order eliminada exitosamente',
    }),
    ApiResponse({
      status: 404,
      description: 'Order no encontrada',
    }),
  );
}
