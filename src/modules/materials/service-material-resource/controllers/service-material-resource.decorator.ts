import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function ApiUpsertServiceMaterialResource() {
  return applyDecorators(
    ApiOperation({
      summary: 'Crear o actualizar relación servicio-recurso material',
      description:
        'Registra una nueva vinculación o actualiza la existente entre un servicio y sus recursos materiales.',
    }),
    ApiResponse({
      status: 200,
      description: 'Relación procesada correctamente (creada o actualizada)',
    }),
    ApiResponse({
      status: 400,
      description: 'Los datos de la relación son inválidos',
    }),
  );
}

export function ApiFindServiceMaterialResource() {
  return applyDecorators(
    ApiOperation({
      summary: 'Consultar recursos materiales de un servicio',
      description:
        'Obtiene el listado de recursos materiales vinculados a un servicio específico.',
    }),
    ApiResponse({
      status: 200,
      description: 'Lista de recursos obtenida correctamente',
    }),
    ApiResponse({
      status: 400,
      description: 'Error en los parámetros de consulta',
    }),
  );
}

export function ApiDeleteServiceMaterialResource() {
  return applyDecorators(
    ApiOperation({
      summary: 'Eliminar relación servicio-recurso material',
      description:
        'Remueve la vinculación técnica entre el servicio y el recurso material indicado.',
    }),
    ApiResponse({
      status: 200,
      description: 'Vínculo eliminado correctamente',
    }),
    ApiResponse({
      status: 400,
      description:
        'No se pudo procesar la eliminación debido a datos inválidos',
    }),
  );
}
