import { applyDecorators } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiResponse } from '@nestjs/swagger';

export function ApiCreateCustomer() {
  return applyDecorators(
    ApiOperation({ summary: 'Crear un nuevo cliente' }),
    ApiHeader({
      name: 'user-id',
      description: 'ID del usuario que realiza la operación',
      required: false,
    }),
    ApiResponse({
      status: 201,
      description: 'Cliente creado exitosamente',
    }),
    ApiResponse({
      status: 400,
      description: 'Datos de entrada inválidos',
    }),
  );
}

export function ApiGetAllCustomers() {
  return applyDecorators(
    ApiOperation({ summary: 'Obtener lista de todos los clientes' }),
    ApiResponse({
      status: 200,
      description: 'Lista de clientes obtenida correctamente',
    }),
  );
}

export function ApiGetCustomerById() {
  return applyDecorators(
    ApiOperation({ summary: 'Obtener un cliente por su ID' }),
    ApiResponse({
      status: 200,
      description: 'Cliente encontrado',
    }),
    ApiResponse({ status: 404, description: 'Cliente no encontrado' }),
  );
}

export function ApiUpdateCustomer() {
  return applyDecorators(
    ApiOperation({ summary: 'Actualizar la información de un cliente' }),
    ApiHeader({
      name: 'user-id',
      description: 'ID del usuario que realiza la operación',
      required: false,
    }),
    ApiResponse({
      status: 200,
      description: 'Cliente actualizado correctamente',
    }),
    ApiResponse({ status: 404, description: 'Cliente no encontrado' }),
  );
}

export function ApiDisableCustomer() {
  return applyDecorators(
    ApiOperation({ summary: 'Deshabilitar un cliente' }),
    ApiHeader({
      name: 'user-id',
      description: 'ID del usuario que realiza la operación',
      required: false,
    }),
    ApiResponse({
      status: 200,
      description: 'Cliente deshabilitado correctamente',
    }),
    ApiResponse({ status: 404, description: 'Cliente no encontrado' }),
  );
}

export function ApiEnableCustomer() {
  return applyDecorators(
    ApiOperation({ summary: 'Habilitar un cliente' }),
    ApiHeader({
      name: 'user-id',
      description: 'ID del usuario que realiza la operación',
      required: false,
    }),
    ApiResponse({
      status: 200,
      description: 'Cliente habilitado correctamente',
    }),
    ApiResponse({ status: 404, description: 'Cliente no encontrado' }),
  );
}

export function ApiRemoveCustomer() {
  return applyDecorators(
    ApiOperation({ summary: 'Eliminar un cliente definitivamente' }),
    ApiHeader({
      name: 'user-id',
      description: 'ID del usuario que realiza la operación',
      required: false,
    }),
    ApiResponse({
      status: 200,
      description: 'Cliente eliminado correctamente',
    }),
    ApiResponse({ status: 404, description: 'Cliente no encontrado' }),
  );
}
