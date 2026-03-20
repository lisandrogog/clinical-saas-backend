import {
  Controller,
  Get,
  Post,
  Body,
  Headers,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrderItemService } from '../services';
import {
  CreateServiceOrderItemDto,
  UpdateServiceOrderItemDto,
  CreateManyServiceOrderItemsDto,
} from '@shared-common';
import { ApiTags } from '@nestjs/swagger';
import {
  ApiCreateOrderItem,
  ApiGetAllOrderItems,
  ApiGetOrderItemById,
  ApiUpdateOrderItem,
  ApiRemoveOrderItem,
  ApiCreateManyOrderItems,
  ApiRemoveAllOrderItems,
} from './order-item.decorator';
import { TenantId, BusinessUnitId } from '@modules/utils/decorators';

@ApiTags('service-order-item')
@Controller('service-order-item')
export class OrderItemController {
  constructor(private readonly orderItemService: OrderItemService) {}

  @Post()
  @ApiCreateOrderItem()
  async create(
    @Body() dto: CreateServiceOrderItemDto,
    @TenantId() tenantId: string,
    @BusinessUnitId() businessUnitId: string,
  ) {
    return await this.orderItemService.create(tenantId, businessUnitId, dto);
  }

  @Get('order/:serviceOrderId')
  @ApiGetAllOrderItems()
  async findAll(
    @TenantId() tenantId: string,
    @BusinessUnitId() businessUnitId: string,
    @Param('serviceOrderId') serviceOrderId: string,
  ) {
    return await this.orderItemService.findAll(
      tenantId,
      businessUnitId,
      serviceOrderId,
    );
  }

  @Get(':id/order/:serviceOrderId')
  @ApiGetOrderItemById()
  async findOne(
    @TenantId() tenantId: string,
    @BusinessUnitId() businessUnitId: string,
    @Param('serviceOrderId') serviceOrderId: string,
    @Param('id') id: string,
  ) {
    return await this.orderItemService.findOne(
      tenantId,
      businessUnitId,
      serviceOrderId,
      id,
    );
  }

  @Patch(':id/order/:serviceOrderId')
  @ApiUpdateOrderItem()
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateServiceOrderItemDto,
    @TenantId() tenantId: string,
    @BusinessUnitId() businessUnitId: string,
    @Param('serviceOrderId') serviceOrderId: string,
  ) {
    return await this.orderItemService.update(
      tenantId,
      businessUnitId,
      serviceOrderId,
      id,
      dto,
    );
  }

  @Delete(':id/order/:serviceOrderId')
  @ApiRemoveOrderItem()
  async remove(
    @TenantId() tenantId: string,
    @BusinessUnitId() businessUnitId: string,
    @Param('serviceOrderId') serviceOrderId: string,
    @Param('id') id: string,
  ) {
    return await this.orderItemService.remove(
      tenantId,
      businessUnitId,
      serviceOrderId,
      id,
    );
  }

  @Post('many')
  @ApiCreateManyOrderItems()
  async createMany(
    @Body() dto: CreateManyServiceOrderItemsDto,
    @TenantId() tenantId: string,
    @BusinessUnitId() businessUnitId: string,
  ) {
    return await this.orderItemService.createMany(
      tenantId,
      businessUnitId,
      dto,
    );
  }

  @Delete('all/order/:serviceOrderId')
  @ApiRemoveAllOrderItems()
  async removeAll(
    @TenantId() tenantId: string,
    @BusinessUnitId() businessUnitId: string,
    @Param('serviceOrderId') serviceOrderId: string,
  ) {
    return await this.orderItemService.removeAll(
      tenantId,
      businessUnitId,
      serviceOrderId,
    );
  }
}
