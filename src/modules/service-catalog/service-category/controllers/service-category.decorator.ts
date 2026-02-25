import { applyDecorators } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiResponse } from '@nestjs/swagger';

export function ApiCreateServiceCategory() {
  return applyDecorators(
    ApiOperation({
      summary: 'Crear una nueva categoría de servicio',
      description:
        'Permite registrar una nueva categoría para agrupar servicios.',
    }),
    ApiHeader({
      name: 'user-id',
      description: 'ID del usuario que realiza la operación',
      required: false,
    }),
    ApiResponse({
      status: 201,
      description: 'Categoría creada exitosamente',
    }),
    ApiResponse({
      status: 404,
      description: 'Recurso relacionado no encontrado',
    }),
  );
}

export function ApiGetAllServiceCategories() {
  return applyDecorators(
    ApiOperation({
      summary: 'Obtener todas las categorías',
      description:
        'Retorna un listado completo de las categorías de servicios registradas.',
    }),
    ApiResponse({
      status: 200,
      description: 'Listado obtenido correctamente',
    }),
    ApiResponse({
      status: 404,
      description: 'No se encontraron categorías',
    }),
  );
}

export function ApiGetServiceCategoryById() {
  return applyDecorators(
    ApiOperation({
      summary: 'Obtener categoría por ID',
      description:
        'Busca una categoría específica utilizando su identificador único.',
    }),
    ApiResponse({
      status: 200,
      description: 'Categoría encontrada',
    }),
    ApiResponse({
      status: 404,
      description: 'Categoría no encontrada',
    }),
  );
}

export function ApiGetServiceCategoryByCode() {
  return applyDecorators(
    ApiOperation({
      summary: 'Obtener categoría por código',
      description:
        'Busca una categoría utilizando su código interno o de negocio.',
    }),
    ApiResponse({
      status: 200,
      description: 'Categoría encontrada correctamente',
    }),
    ApiResponse({
      status: 404,
      description: 'Categoría no encontrada',
    }),
  );
}

export function ApiUpdateServiceCategory() {
  return applyDecorators(
    ApiOperation({
      summary: 'Actualizar categoría',
      description:
        'Actualiza los datos de una categoría de servicio existente.',
    }),
    ApiHeader({
      name: 'user-id',
      description: 'ID del usuario que realiza la operación',
      required: false,
    }),
    ApiResponse({
      status: 200,
      description: 'Categoría actualizada correctamente',
    }),
    ApiResponse({
      status: 404,
      description: 'Categoría no encontrada',
    }),
  );
}

export function ApiRemoveServiceCategory() {
  return applyDecorators(
    ApiOperation({
      summary: 'Eliminar categoría',
      description:
        'Elimina de forma lógica o física una categoría de servicio.',
    }),
    ApiHeader({
      name: 'user-id',
      description: 'ID del usuario que realiza la operación',
      required: false,
    }),
    ApiResponse({
      status: 200,
      description: 'Categoría eliminada correctamente',
    }),
    ApiResponse({
      status: 404,
      description: 'Categoría no encontrada',
    }),
  );
}
