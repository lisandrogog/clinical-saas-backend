import {
  Controller,
  Get,
  Post,
  Body,
  Headers,
  Patch,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { CustomerService } from './services/customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { ApiHeader, ApiResponse, ApiTags, ApiOperation } from '@nestjs/swagger';
import { BaseSearchPaginationDto } from '@modules/utils/dto';
import { TenantId } from '@modules/utils/tenant-id.decorator';
import { CustomerActivationService } from './services/customer-activation.service';

@ApiTags('customer')
@ApiHeader({
  name: 'tenant-id',
  description: 'UUID del Tenant/Organización',
  required: true,
})
@Controller('customer')
export class CustomerController {
  constructor(
    private readonly customerService: CustomerService,
    private readonly customerActivationService: CustomerActivationService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo cliente/paciente' })
  @ApiHeader({
    name: 'user-id',
    description: 'ID del usuario operador',
    required: false,
  })
  @ApiResponse({ status: 201, description: 'Cliente creado exitosamente' })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos o el cliente ya existe',
  })
  async create(
    @TenantId() tenantId: string,
    @Body() payload: CreateCustomerDto,
    @Headers('user-id') userId?: string,
  ) {
    return await this.customerService.create(tenantId, payload, userId);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener lista de clientes con paginación' })
  @ApiResponse({
    status: 200,
    description: 'Lista de clientes obtenida exitosamente',
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  async findAll(
    @TenantId() tenantId: string,
    @Query() query: BaseSearchPaginationDto,
  ) {
    return await this.customerService.findAll(tenantId, query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un cliente/paciente por ID' })
  @ApiResponse({ status: 200, description: 'Cliente obtenido exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 404, description: 'Cliente no encontrado' })
  async findOne(
    @TenantId() tenantId: string,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    return await this.customerService.findOne(tenantId, id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un cliente/paciente por ID' })
  @ApiHeader({
    name: 'user-id',
    description: 'ID del usuario operador',
    required: false,
  })
  @ApiResponse({ status: 200, description: 'Cliente actualizado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  async update(
    @TenantId() tenantId: string,
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() payload: UpdateCustomerDto,
    @Headers('user-id') userId?: string,
  ) {
    return await this.customerService.update(tenantId, id, payload, userId);
  }

  @Patch(':id/disable')
  @ApiOperation({ summary: 'Deshabilitar un cliente/paciente por ID' })
  @ApiHeader({
    name: 'user-id',
    description: 'ID del usuario operador',
    required: false,
  })
  @ApiResponse({
    status: 200,
    description: 'Cliente deshabilitado exitosamente',
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  async disable(
    @TenantId() tenantId: string,
    @Param('id', new ParseUUIDPipe()) id: string,
    @Headers('user-id') userId?: string,
  ) {
    return await this.customerActivationService.disable(tenantId, id, userId);
  }

  @Patch(':id/enable')
  @ApiOperation({ summary: 'Habilitar un cliente/paciente por ID' })
  @ApiHeader({
    name: 'user-id',
    description: 'ID del usuario operador',
    required: false,
  })
  @ApiResponse({ status: 200, description: 'Cliente habilitado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  async enable(
    @TenantId() tenantId: string,
    @Param('id', new ParseUUIDPipe()) id: string,
    @Headers('user-id') userId?: string,
  ) {
    return await this.customerActivationService.enable(tenantId, id, userId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un cliente/paciente por ID' })
  @ApiResponse({ status: 200, description: 'Cliente eliminado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  async remove(
    @TenantId() tenantId: string,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    return await this.customerService.remove(tenantId, id);
  }
}
