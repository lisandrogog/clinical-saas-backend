import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiHeader, ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
  AssociateServicesDto,
  AssociateUnitsDto,
  CreateServiceBusinessUnitDto,
  UpdateServiceBusinessUnitDto,
} from '@shared-common';

export function ApiCreateServiceBusinessUnit() {
  return applyDecorators(
    ApiOperation({
      summary: 'Crear relación entre servicio y unidad de negocio',
      description:
        'Crea una nueva asociación entre un servicio y una unidad operativa.',
    }),
    ApiHeader({
      name: 'user-id',
      description: 'ID del usuario que realiza la operación',
      required: false,
    }),
    ApiBody({
      type: CreateServiceBusinessUnitDto,
    }),
    ApiResponse({
      status: 201,
      description: 'Relación creada exitosamente',
    }),
  );
}

export function ApiGetUnitsByService() {
  return applyDecorators(
    ApiOperation({
      summary: 'Obtener unidades por servicio',
      description:
        'Lista todas las unidades de negocio asociadas a un servicio específico.',
    }),
    ApiResponse({
      status: 200,
      description: 'Lista de unidades obtenida correctamente',
    }),
    ApiResponse({
      status: 404,
      description: 'Servicio no encontrado',
    }),
  );
}

export function ApiGetServicesByUnit() {
  return applyDecorators(
    ApiOperation({
      summary: 'Obtener servicios por unidad',
      description:
        'Lista todos los servicios asociados a una unidad de negocio específica.',
    }),
    ApiResponse({
      status: 200,
      description: 'Lista de servicios obtenida correctamente',
    }),
    ApiResponse({
      status: 404,
      description: 'Unidad de negocio no encontrada',
    }),
  );
}

export function ApiGetOneServiceBusinessUnitById() {
  return applyDecorators(
    ApiOperation({
      summary: 'Obtener relación por ID',
      description:
        'Busca una asociación específica mediante su identificador único.',
    }),
    ApiResponse({
      status: 200,
      description: 'Asociación encontrada correctamente',
    }),
    ApiResponse({
      status: 404,
      description: 'Relación no encontrada',
    }),
  );
}

export function ApiUpdateServiceBusinessUnit() {
  return applyDecorators(
    ApiOperation({
      summary: 'Actualizar relación servicio-unidad',
      description: 'Modifica los datos de una asociación existente.',
    }),
    ApiHeader({
      name: 'user-id',
      description: 'ID del usuario que realiza la operación',
      required: false,
    }),
    ApiBody({
      type: UpdateServiceBusinessUnitDto,
    }),
    ApiResponse({
      status: 200,
      description: 'Relación actualizada correctamente',
    }),
    ApiResponse({
      status: 404,
      description: 'Relación no encontrada',
    }),
  );
}

export function ApiAssociateServices() {
  return applyDecorators(
    ApiOperation({
      summary: 'Asociar múltiples servicios',
      description:
        'Vincula varios servicios a una unidad de negocio de forma masiva.',
    }),
    ApiHeader({
      name: 'user-id',
      description: 'ID del usuario que realiza la operación',
      required: false,
    }),
    ApiBody({
      type: AssociateServicesDto,
    }),
    ApiResponse({
      status: 200,
      description: 'Servicios asociados exitosamente',
    }),
    ApiResponse({
      status: 404,
      description: 'Recurso no encontrado',
    }),
  );
}

export function ApiAssociateUnits() {
  return applyDecorators(
    ApiOperation({
      summary: 'Asociar múltiples unidades',
      description:
        'Vincula varias unidades de negocio a un servicio de forma masiva.',
    }),
    ApiHeader({
      name: 'user-id',
      description: 'ID del usuario que realiza la operación',
      required: false,
    }),
    ApiBody({
      type: AssociateUnitsDto,
    }),
    ApiResponse({
      status: 200,
      description: 'Unidades asociadas exitosamente',
    }),
    ApiResponse({
      status: 404,
      description: 'Recurso no encontrado',
    }),
  );
}

export function ApiDeleteServiceBusinessUnit() {
  return applyDecorators(
    ApiOperation({
      summary: 'Eliminar relación servicio-unidad',
      description:
        'Elimina la asociación técnica entre el servicio y la unidad.',
    }),
    ApiResponse({
      status: 200,
      description: 'Relación eliminada correctamente',
    }),
    ApiResponse({
      status: 404,
      description: 'Relación no encontrada',
    }),
  );
}
