import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function ApiUpsertProviderService() {
  return applyDecorators(
    ApiOperation({
      summary: 'Crear o actualizar relación proveedor-servicio',
      description:
        'Registra una nueva vinculación o actualiza la existente entre un proveedor y un servicio.',
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

export function ApiFindProviderServiceByUnit() {
  return applyDecorators(
    ApiOperation({
      summary: 'Consultar servicios del proveedor por unidad',
      description:
        'Obtiene el listado de servicios vinculados a un proveedor dentro de una unidad de negocio específica.',
    }),
    ApiResponse({
      status: 200,
      description: 'Lista de servicios obtenida correctamente',
    }),
    ApiResponse({
      status: 400,
      description: 'Error en los parámetros de consulta',
    }),
  );
}

export function ApiDeleteProviderService() {
  return applyDecorators(
    ApiOperation({
      summary: 'Eliminar relación proveedor-servicio',
      description:
        'Remueve la vinculación técnica entre el proveedor y el servicio indicado.',
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
