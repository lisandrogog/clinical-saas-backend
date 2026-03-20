import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { CustomerService } from '../services/customer.service';
import { CreateCustomerDto, UpdateCustomerDto } from '@shared-common';
import { ApiTags } from '@nestjs/swagger';
import { BaseSearchPaginationDto } from '@modules/utils/dto';
import { TenantId, UserId } from '@modules/utils/decorators';
import { CustomerActivationService } from '../services/customer-activation.service';
import {
  ApiCreateCustomer,
  ApiDisableCustomer,
  ApiEnableCustomer,
  ApiGetAllCustomers,
  ApiGetCustomerById,
  ApiRemoveCustomer,
  ApiUpdateCustomer,
} from './customer.decorator';
import { ApiCommonDecorator } from '@modules/utils/controllers/common.decorator';

@ApiTags('customer')
@ApiCommonDecorator()
@Controller('customer')
export class CustomerController {
  constructor(
    private readonly customerService: CustomerService,
    private readonly customerActivationService: CustomerActivationService,
  ) {}

  @Post()
  @ApiCreateCustomer()
  async create(
    @TenantId() tenantId: string,
    @Body() payload: CreateCustomerDto,
    @UserId() userId?: string,
  ) {
    return await this.customerService.create(tenantId, payload, userId);
  }

  @Get()
  @ApiGetAllCustomers()
  async findAll(
    @TenantId() tenantId: string,
    @Query() query: BaseSearchPaginationDto,
  ) {
    return await this.customerService.findAll(tenantId, query);
  }

  @Get(':id')
  @ApiGetCustomerById()
  async findOne(
    @TenantId() tenantId: string,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    return await this.customerService.findOne(tenantId, id);
  }

  @Patch(':id')
  @ApiUpdateCustomer()
  async update(
    @TenantId() tenantId: string,
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() payload: UpdateCustomerDto,
    @UserId() userId?: string,
  ) {
    return await this.customerService.update(tenantId, id, payload, userId);
  }

  @Patch(':id/disable')
  @ApiDisableCustomer()
  async disable(
    @TenantId() tenantId: string,
    @Param('id', new ParseUUIDPipe()) id: string,
    @UserId() userId?: string,
  ) {
    return await this.customerActivationService.disable(tenantId, id, userId);
  }

  @Patch(':id/enable')
  @ApiEnableCustomer()
  async enable(
    @TenantId() tenantId: string,
    @Param('id', new ParseUUIDPipe()) id: string,
    @UserId() userId?: string,
  ) {
    return await this.customerActivationService.enable(tenantId, id, userId);
  }

  @Delete(':id')
  @ApiRemoveCustomer()
  async remove(
    @TenantId() tenantId: string,
    @Param('id', new ParseUUIDPipe()) id: string,
    @UserId() userId?: string,
  ) {
    return await this.customerService.remove(tenantId, id, userId);
  }
}
