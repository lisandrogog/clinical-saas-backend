import { applyDecorators } from '@nestjs/common';
import { ApiHeader, ApiResponse } from '@nestjs/swagger';

export function ApiCommonDecorator() {
  return applyDecorators(
    ApiHeader({
      name: 'tenant-id',
      description:
        'ID del Tenant para identificar el contexto de la organización',
      required: true,
    }),
    ApiResponse({
      status: 400,
      description:
        'Petición incorrecta: los datos enviados son inválidos o faltan campos obligatorios',
    }),
    ApiResponse({
      status: 401,
      description:
        'No autorizado: falta el token de autenticación o es inválido',
    }),
    ApiResponse({
      status: 403,
      description:
        'Prohibido: no tienes permisos suficientes para realizar esta acción',
    }),
    ApiResponse({
      status: 500,
      description:
        'Error interno del servidor: ocurrió un problema inesperado en el sistema',
    }),
  );
}
