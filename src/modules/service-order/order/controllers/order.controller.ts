import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { OrderService } from '../services/order.service';
import { CreateServiceOrderDto, UpdateServiceOrderDto } from '../dto';
import { ApiTags } from '@nestjs/swagger';
import {
  ApiCreateOrder,
  ApiGetAllOrders,
  ApiGetOrderById,
  ApiUpdateOrder,
  ApiDeleteOrder,
} from './order.decorator';
import {
  TenantId,
  BusinessUnitId,
  UserId,
  CustomerId,
  AgentId,
} from '@modules/utils/decorators';
import { BaseSearchPaginationDto } from '@modules/utils/dto';

@ApiTags('service-order')
@Controller('service-order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @ApiCreateOrder()
  async create(
    @TenantId() tenantId: string,
    @BusinessUnitId() businessUnitId: string,
    @Body() dto: CreateServiceOrderDto,
    @UserId() userId?: string,
  ) {
    return this.orderService.create(tenantId, businessUnitId, dto, userId);
  }

  @Get()
  @ApiGetAllOrders()
  async findAll(
    @TenantId() tenantId: string,
    @Query() searchFilters: BaseSearchPaginationDto,
    @BusinessUnitId() businessUnitId?: string,
    @CustomerId() customerId?: string,
    @AgentId() agentId?: string,
  ) {
    return await this.orderService.findAll(
      tenantId,
      searchFilters,
      businessUnitId,
      customerId,
      agentId,
    );
  }

  @Get(':id')
  @ApiGetOrderById()
  async findOne(
    @TenantId() tenantId: string,
    @BusinessUnitId() businessUnitId: string,
    @Param('id') id: string,
  ) {
    return await this.orderService.findOne(id, tenantId, businessUnitId);
  }

  @Patch(':id')
  @ApiUpdateOrder()
  async update(
    @TenantId() tenantId: string,
    @BusinessUnitId() businessUnitId: string,
    @Param('id') id: string,
    @Body() dto: UpdateServiceOrderDto,
    @UserId() userId?: string,
  ) {
    return await this.orderService.update(
      tenantId,
      businessUnitId,
      id,
      dto,
      userId,
    );
  }

  @Delete(':id')
  @ApiDeleteOrder()
  async remove(
    @TenantId() tenantId: string,
    @BusinessUnitId() businessUnitId: string,
    @Param('id') id: string,
    @UserId() userId?: string,
  ) {
    return await this.orderService.remove(tenantId, businessUnitId, id, userId);
  }
}
